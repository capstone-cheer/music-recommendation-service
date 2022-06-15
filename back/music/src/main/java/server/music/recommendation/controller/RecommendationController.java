package server.music.recommendation.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.RequiredArgsConstructor;
import server.music.global.dto.SongResultDto;
import server.music.recommendation.controller.form.RecommendSongForm;
import server.music.recommendation.controller.form.RecommendSongListForm;
import server.music.recommendation.service.RecommendationService;

@Controller
@RequiredArgsConstructor
public class RecommendationController {

	private final RecommendationService recommendationService;

	@PostMapping("/recommend/song")
	public ResponseEntity<List<SongResultDto>> recommendSongsBySong(@RequestBody RecommendSongForm form) {
		String songId = form.getSongId();
		List<String> category = form.getCategory();
		List<SongResultDto> songList = recommendationService.getSongListFromFlask(songId, category);
		return ResponseEntity.ok(songList);
	}

	@PostMapping("/recommend/playlist")
	public ResponseEntity<List<SongResultDto>> recommendSongsByPlaylist(@RequestBody RecommendSongListForm form) {
		List<String> songIdList = form.getSongIdList();
		List<String> category = form.getCategory();
		List<SongResultDto> songList = recommendationService.getSongListFromFlaskPlaylist(songIdList, category);
		return ResponseEntity.ok(songList);
	}
}
