package server.music.service;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.model_objects.specification.Track;
import server.music.controller.SongResultDto;

@Service
@RequiredArgsConstructor
public class RecommendationService {

	private final SpotifyApi spotifyApi;
	private final SpotifyService spotifyService;

	public List<SongResultDto> getSongListFromFlask(String songId, List<String> category) {
		List<SongResultDto> ret = new ArrayList<>();

		RestTemplate restTemplate = new RestTemplate();

		String targetUrl = "http://127.0.0.1:5000/recommend/song";
		JSONObject requestBody = new JSONObject();
		requestBody.put("song_id", songId);
		requestBody.put("category", category);
		FlaskPlaylistDto flaskPlaylistDto = restTemplate.postForObject(targetUrl, requestBody, FlaskPlaylistDto.class);

		//이제 받아서 song ID list로 song id, name, albumname, artist name 뽑아서 SongResultDto로 만들어서 클라이언트에 리턴
		List<String> songIdList = flaskPlaylistDto.getSongIdList();
		String apiKeyword = spotifyService.makeApiKeywordForSeveralTracks(songIdList);
		System.out.println("substring = " + apiKeyword);
		try {
			Track[] execute = spotifyApi.getSeveralTracks(apiKeyword).build().execute();
			for (Track track : execute) {
				ret.add(new SongResultDto(
						track.getId(),
						track.getName(),
						track.getAlbum().getName(),
						track.getArtists()[0].getName(), //일단 한명만
						track.getAlbum().getImages()[0].getUrl()
				));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ret;
	}



	public List<SongResultDto> getSongListFromFlaskPlaylist(List<String> songIdList, List<String> category) {

		RestTemplate restTemplate = new RestTemplate();

		String targetUrl = "http://127.0.0.1:5000/recommend/playlist";
		JSONObject requestBody = new JSONObject();
		requestBody.put("song_id_list", songIdList);
		requestBody.put("category", category);
		FlaskPlaylistDto flaskPlaylistDto = restTemplate.postForObject(targetUrl, requestBody, FlaskPlaylistDto.class);

		List<String> flaskResult = flaskPlaylistDto.getSongIdList();
		String apiKeyword = spotifyService.makeApiKeywordForSeveralTracks(flaskResult);
		System.out.println("substring = " + apiKeyword);

		List<SongResultDto> ret = new ArrayList<>();
		try {
			Track[] execute = spotifyApi.getSeveralTracks(apiKeyword).build().execute();
			for (Track track : execute) {
				ret.add(new SongResultDto(
						track.getId(),
						track.getName(),
						track.getAlbum().getName(),
						track.getArtists()[0].getName(), //일단 한명만
						track.getAlbum().getImages()[0].getUrl()
				));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ret;
	}
}
