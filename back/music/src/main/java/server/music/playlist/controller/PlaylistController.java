package server.music.playlist.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import server.music.playlist.controller.dto.PlaylistThumbnail;
import server.music.global.dto.SongResultDto;
import server.music.playlist.controller.form.PlaylistForm;
import server.music.playlist.controller.form.SongIdListForm;
import server.music.member.domain.Member;
import server.music.playlist.domain.Playlist;
import server.music.playlist.domain.constvalue.Default;
import server.music.member.service.MemberService;
import server.music.playlist.service.PlaylistService;

@RestController
@RequiredArgsConstructor
public class PlaylistController {

	private final PlaylistService playlistService;
	private final MemberService memberService;

	/**
	 * 재생목록 이름 주고 생성
	 */
	@PostMapping("/playlists/{member_id}/create")
	@ResponseStatus(HttpStatus.CREATED)
	public PlaylistThumbnail create(@PathVariable("member_id") Long memberId, @RequestBody PlaylistForm playlistForm) {
		Member member = memberService.findOne(memberId);
		String name = playlistForm.getName();
		Long playlistId = playlistService.createPlaylist(member, name);
		return new PlaylistThumbnail(
				playlistId,
				playlistForm.getName(),
				Default.THUMBNAIL
		);
	}

	/**
	 * 재생목록에 음악 추가
	 */
	@PostMapping("/playlists/{playlist_id}/add")
	public ResponseEntity<String> addSongs(@PathVariable("playlist_id") Long playlistId,
			@RequestBody SongIdListForm songCodeDto) {
		List<String> songCodeList = songCodeDto.getSongIdList();
		try {
			playlistService.addSongs(playlistId, songCodeList);
			return ResponseEntity.ok("success");
		} catch (Exception e) {
			return ResponseEntity.internalServerError().body("fail");
		}
	}

	/**
	 * 사용자 재생목록 조회
	 */
	@GetMapping("/playlists/{member_id}")
	public List<PlaylistThumbnail> findAllPlaylists(@PathVariable("member_id") Long memberId) {
		List<PlaylistThumbnail> playlists = new ArrayList<>();
		List<Playlist> userPlaylists = playlistService.findAllUserPlaylist(memberId);
		for (Playlist userPlaylist : userPlaylists) {
			playlists.add(new PlaylistThumbnail(
					userPlaylist.getId(),
					userPlaylist.getName(),
					userPlaylist.getImageUrl()
			));
		}
		return playlists;
	}

	@GetMapping("/playlists/{member_id}/{playlist_id}")
	public ResponseEntity<List<SongResultDto>> getSongsInPlaylist(
			@PathVariable("member_id") Long memberId,
			@PathVariable("playlist_id") Long playlistId) {
		try {
			List<SongResultDto> songList = playlistService.getSongList(memberId, playlistId);
			return ResponseEntity.ok(songList);
		} catch (IllegalStateException e) {
			return ResponseEntity.badRequest().build();
		}
	}
}
