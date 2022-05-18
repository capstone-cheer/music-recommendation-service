package server.music.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import server.music.controller.PlaylistForm;
import server.music.domain.Member;
import server.music.domain.Playlist;
import server.music.domain.PlaylistSong;
import server.music.domain.Song;
import server.music.repository.MemberRepository;
import server.music.repository.PlaylistRepository;
import server.music.repository.SongRepository;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PlaylistService {

	private final PlaylistRepository playlistRepository;
	private final MemberRepository memberRepository;
	private final SongRepository songRepository;

	/**
	 * 플레이리스트 생성
	 */
	public Long createPlaylist(Long memberId, PlaylistForm playlistForm) {
		Member member = memberRepository.findOne(memberId);
		String name = playlistForm.getName();
		Playlist playlist = Playlist.createPlaylist(name, member);
		return playlistRepository.save(playlist);
	}

	/**
	 * 플레이리스트에 음악 추가
	 */
	public void addSongs(Long playlistId, List<String> songCodeList) {
		Playlist findPlaylist = playlistRepository.findOne(playlistId);
		for (String songCode : songCodeList) {
			Song findSong = songRepository.findOne(songCode);
			PlaylistSong playlistSong = PlaylistSong.createPlaylistSong(
				findPlaylist,
				findSong
			);
			findPlaylist.addPlaylistSong(playlistSong);
		}
	}

	/**
	 * 플레이리스트 전체 조회
	 */
	public List<Playlist> findAllUserPlaylist(Long memberId) {
		Member member = memberRepository.findOne(memberId);
		return playlistRepository.findAllUserPlaylist(member);
	}

}
