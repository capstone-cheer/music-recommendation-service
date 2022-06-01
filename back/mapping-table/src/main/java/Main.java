import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections.list.AbstractLinkedList;
import org.apache.hc.core5.http.ParseException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.special.SearchResult;
import se.michaelthelin.spotify.model_objects.specification.AudioFeatures;
import se.michaelthelin.spotify.model_objects.specification.Track;
import se.michaelthelin.spotify.requests.data.tracks.GetAudioFeaturesForSeveralTracksRequest;
import spotify.SpotifyService;

public class Main {

	private static FileWriter outputFile;
	private final static String TARGET_FILE = "./src/main/java/data/melon_to_spotify17.json";

	private final static String OPEN_FILE_AUDIO_ANALYSIS = "./src/main/java/data/melon_to_spotify1.json";
	private final static String TARGET_FILE_AUDIO_ANALYSIS = "./src/main/java/data/audio_analysis1.json";

	public static void main(String[] args) throws Exception {
		SpotifyService.initialize();

		SpotifyApi spotifyApi = SpotifyService.getSpotifyService();

		make_mapping_table(spotifyApi);
// 		get_audio_analysis(spotifyApi);
	}

	private static void make_mapping_table(SpotifyApi spotifyApi) throws Exception {
		JSONParser parser = new JSONParser();
		Reader reader = new FileReader(TARGET_FILE);
		JSONArray jsonArray = (JSONArray)parser.parse(reader);

		//jsonArray = (JSONArray)parser.parse(reader);
		List<String>[] melonDataSets = readJsonFile(363001, 366000); // [] 폐구간 357001 ~ 378000
		for (List<String> melonDataSet : melonDataSets) {
			JSONObject jsonObject = new JSONObject();
			String artist = melonDataSet.get(0);
			String song = melonDataSet.get(1);
			String id = melonDataSet.get(2);

			String q = song + " " + artist;
			String type = "track";
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
			//String album_name = jsonObject.get("album_name").toString();
			JSONArray artist_name_basket = (JSONArray)jsonObject.get("artist_name_basket");
			String artist_name = artist_name_basket.get(0).toString();
			String song_name = jsonObject.get("song_name").toString();

			ret[ind].add(artist_name);
			//ret[ind].add(album_name);
			ret[ind].add(song_name);
			ret[ind++].add(Integer.toString(id));
		}

		return ret;
	}

	private static void get_audio_analysis(SpotifyApi spotifyApi) throws Exception {
		JSONParser parser = new JSONParser();
		Reader reader = new FileReader(OPEN_FILE_AUDIO_ANALYSIS);
		JSONArray melon_to_spotify_json = (JSONArray)parser.parse(reader);

		Reader audio_analysis_reader = new FileReader(TARGET_FILE_AUDIO_ANALYSIS);
		JSONArray audio_analysis_json = (JSONArray)parser.parse(audio_analysis_reader);


		int start_melon_id = 21001; // 1 붙여
		for(int cnt = 0; cnt < 210; cnt++){
			String spotify_ids = "";
			List<Integer> melon_ids = new ArrayList<>();
			for(int i = 100*cnt; i < 100+100*cnt; i++){
				JSONObject jsonObject = (JSONObject) melon_to_spotify_json.get(i);
				String spotifyId = (String)jsonObject.get(Integer.toString(start_melon_id+i));
				if(spotifyId.equals("null")){
					continue;
				} else{
					melon_ids.add(i);
					spotify_ids += spotifyId + ",";
				}
			}
			System.out.println(melon_ids);
			String substr = spotify_ids.substring(0, spotify_ids.length() - 1);
			System.out.println("substr = " + substr);
			AudioFeatures[] execute = spotifyApi.getAudioFeaturesForSeveralTracks(substr)
					.build().execute();

			int here = 0;

			for(int i = 100*cnt; i < 100+100*cnt; i++){
				if(here == melon_ids.size()){
					here--;
				}
				JSONObject jsonObject = new JSONObject();
				if(melon_ids.get(here) != i){
					makeNullJson(jsonObject);
				} else{
					AudioFeatures audioFeature;
					try{
						audioFeature = execute[here];
						jsonObject.put("tempo", audioFeature.getTempo());
						jsonObject.put("acousticness", audioFeature.getAcousticness());
						jsonObject.put("danceability", audioFeature.getDanceability());
						jsonObject.put("liveness", audioFeature.getLiveness());
						jsonObject.put("loudness", audioFeature.getLoudness());
						jsonObject.put("speechiness", audioFeature.getSpeechiness());
						here++;
					} catch(Exception e){
						makeNullJson(jsonObject);
					}
				}
				JSONObject finalObj = new JSONObject();
				finalObj.put(start_melon_id + i, jsonObject);
				audio_analysis_json.add(finalObj);

			}
		}

		outputFile = new FileWriter(TARGET_FILE_AUDIO_ANALYSIS, false);
		outputFile.write(audio_analysis_json.toJSONString());
		outputFile.flush();
	}

	private static void makeNullJson(JSONObject jsonObject) {
		jsonObject.put("tempo", 0);
		jsonObject.put("acousticness", 0);
		jsonObject.put("danceability", 0);
		jsonObject.put("liveness", 0);
		jsonObject.put("loudness", 0);
		jsonObject.put("speechiness", 0);
	}
}
