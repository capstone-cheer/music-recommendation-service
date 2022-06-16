package server.music.spotify.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import se.michaelthelin.spotify.SpotifyApi;

@Service
@RequiredArgsConstructor
public class SpotifyService {

	private final SpotifyApi spotifyApi;

	/**
	 * 스포티파이 getSeveralTracks()의 keyword 생성기
	 */
	public String makeApiKeywordForSeveralTracks(List<String> songIdList) {
		StringBuilder sb = new StringBuilder();
		for (String spotifySongId : songIdList) {
			if (spotifySongId.length() > 7) { //스포티파이 아이디
				sb.append(spotifySongId + ",");
			}
		}
		String substring = sb.substring(0, sb.length() - 1);
		return substring;
	}
}
