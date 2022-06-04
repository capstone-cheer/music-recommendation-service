package server.music.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import server.music.domain.Member;
import server.music.domain.Playlist;
import server.music.domain.constvalue.Default;
import server.music.service.MemberService;
import server.music.service.PlaylistService;

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
	public void addSongs(@PathVariable("playlist_id") Long playlistId, @RequestBody SongCodeDto songCodeDto) {
		List<String> songCodeList = songCodeDto.getSongCodeList();
		playlistService.addSongs(playlistId, songCodeList);
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
}
