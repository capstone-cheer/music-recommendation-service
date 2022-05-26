import java.io.FileReader;
import java.io.FileWriter;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.model_objects.special.SearchResult;
import se.michaelthelin.spotify.model_objects.specification.Track;
import spotify.SpotifyService;

public class Main {

	private static FileWriter outputFile;
	private final static String TARGET_FILE = "./src/main/java/data/melon_to_spotify1.json";

	public static void main(String[] args) throws Exception {
		SpotifyService.initialize();

		SpotifyApi spotifyApi = SpotifyService.getSpotifyService();

		make_mapping_table(spotifyApi);
	}

	private static void make_mapping_table(SpotifyApi spotifyApi) throws Exception {
		JSONParser parser = new JSONParser();
		Reader reader = new FileReader(TARGET_FILE);
		JSONArray jsonArray = (JSONArray)parser.parse(reader);

		//jsonArray = (JSONArray)parser.parse(reader);
		List<String>[] melonDataSets = readJsonFile(38001, 42000); // [] 폐구간
		for (List<String> melonDataSet : melonDataSets) {
			JSONObject jsonObject = new JSONObject();
			String artist = melonDataSet.get(0);
			String song = melonDataSet.get(2);
			String id = melonDataSet.get(3);

			String q = song + " " + artist;
			String type = "track,artist";
			SearchResult execute = spotifyApi.searchItem(q, type)
				.limit(1)
				.build()
				.execute();
			if (execute.getTracks().getItems().length == 0) {
				jsonObject.put(id, "null");
				jsonArray.add(jsonObject);
				continue;
			}
			Track track = execute.getTracks().getItems()[0];
			String spotifySongName = track.getName();
			String spotifyArtistName = track.getArtists()[0].getName();
			String spotifyId = track.getId();
			System.out.println(spotifyId +" "+id);
			// System.out.println(id);

			// System.out.println("spotifySongName = " + spotifySongName);
			// System.out.println("spotifyArtistName = " + spotifyArtistName);
			// System.out.println("melon song name: " + song);
			// System.out.println("melon artist: " + artist);

			jsonObject.put(id, spotifyId);

			jsonArray.add(jsonObject);
		}
		outputFile = new FileWriter(TARGET_FILE, false);
		outputFile.write(jsonArray.toJSONString());
		outputFile.flush();
	}

	private static List<String>[] readJsonFile(int start, int end) throws Exception {
		int len = end - start + 1;
		ArrayList<String>[] ret = new ArrayList[len];
		for (int i = 0; i < len; i++) {
			ret[i] = new ArrayList<>();
		}
		JSONParser parser = new JSONParser();

		Reader reader = new FileReader("./src/main/java/data/song_meta.json");
		JSONArray jsonArray = (JSONArray)parser.parse(reader);

		int ind = 0;
		for (int id = start; id < end + 1; id++) {
			JSONObject jsonObject = (JSONObject)jsonArray.get(id);
			String album_name = jsonObject.get("album_name").toString();
			JSONArray artist_name_basket = (JSONArray)jsonObject.get("artist_name_basket");
			String artist_name = artist_name_basket.get(0).toString();
			String song_name = jsonObject.get("song_name").toString();

			ret[ind].add(artist_name);
			ret[ind].add(album_name);
			ret[ind].add(song_name);
			ret[ind++].add(Integer.toString(id));
		}

		return ret;
	}

}
