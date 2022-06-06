package server.music.service;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.google.gson.JsonObject;

import lombok.RequiredArgsConstructor;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.model_objects.specification.Track;
import server.music.controller.SongResultDto;

@Service
@RequiredArgsConstructor
public class RecommendationService {

	private final SpotifyApi spotifyApi;

	public List<SongResultDto> getSongListFromFlask(String songId) {
		List<SongResultDto> ret = new ArrayList<>();

		RestTemplate restTemplate = new RestTemplate();

		String targetUrl = "http://127.0.0.1:5000/recommend/song";
		JSONObject requestBody = new JSONObject();
		requestBody.put("song_id", songId);
		FlaskPlaylistDto flaskPlaylistDto = restTemplate.postForObject(targetUrl, requestBody, FlaskPlaylistDto.class);

		//이제 받아서 song ID list로 song id, name, albumname, artist name 뽑아서 SongResultDto로 만들어서 클라이언트에 리턴
		List<String> songIdList = flaskPlaylistDto.getSongIdList();
		StringBuilder sb = new StringBuilder();
		for (String spotifySongId : songIdList) {
			if (spotifySongId.length() > 7) { //스포티파이 아이디
				sb.append(spotifySongId+",");
			}
		}
		String substring = sb.substring(0, sb.length() - 1);
		System.out.println("substring = " + substring);
		try {
			Track[] execute = spotifyApi.getSeveralTracks(substring).build().execute();
			for (Track track : execute) {
				ret.add(new SongResultDto(
					track.getId(),
					track.getName(),
					track.getAlbum().getName(),
					track.getArtists()[0].getName() //일단 한명만
				));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ret;
	}
}
