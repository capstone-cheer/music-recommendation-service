package server.music.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.RequiredArgsConstructor;
import server.music.service.RecommendationService;

@Controller
@RequiredArgsConstructor
public class RecommendationController {

	private final RecommendationService recommendationService;

	@PostMapping("/recommend/song")
	public ResponseEntity<List<SongResultDto>> recommendSongsBySong(@RequestBody SongForm song) {
		String songId = song.getSongId();
		List<SongResultDto> songList = recommendationService.getSongListFromFlask(songId);
		return ResponseEntity.ok(songList);
	}

	@PostMapping("/recommend/playlist")
	public ResponseEntity<List<SongResultDto>> recommendSongsByPlaylist(@RequestBody RecommendPlaylistForm form) {
		List<String> songIdList = form.getSongIdList();
		List<SongResultDto> songList = recommendationService.getSongListFromFlaskPlaylist(songIdList);
		return ResponseEntity.ok(songList);
	}
}
