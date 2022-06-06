package server.music.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import server.music.controller.SongResultDto;
import server.music.domain.Member;
import server.music.domain.Playlist;
import server.music.domain.PlaylistSong;
import server.music.domain.Song;
import server.music.repository.MemberRepository;
import server.music.repository.PlaylistRepository;
import server.music.repository.SongRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlaylistService {

	private final PlaylistRepository playlistRepository;
	private final MemberRepository memberRepository;
	private final SongRepository songRepository;

	/**
	 * 플레이리스트 생성
	 */
	@Transactional
	public Long createPlaylist(Member member, String playlistName) {
		Playlist playlist = Playlist.createPlaylist(playlistName, member);
		return playlistRepository.save(playlist);
	}

	/**
	 * 플레이리스트에 음악 추가
	 */
	@Transactional
	public void addSongs(Long playlistId, List<String> songCodeList) throws IllegalStateException {
		Playlist findPlaylist = playlistRepository.findOne(playlistId);
		if (findPlaylist == null) {
			throw new IllegalStateException("존재하지 않는 플레이리스트");
		}
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

	public List<SongResultDto> getSongList(Long memberId, Long playlistId) throws IllegalStateException {
		Playlist one = validatePlaylistId(memberId, playlistId);
		if (one == null) {
			throw new IllegalStateException("존재하지 않는 플레이리스트 입니다.");
		}
		List<PlaylistSong> playlistSongs = one.getPlaylistSongs();
		List<SongResultDto> ret = new ArrayList<>();
		for (PlaylistSong playlistSong : playlistSongs) {
			Song song = playlistSong.getSong();
			ret.add(new SongResultDto(
					song.getSongCode(),
					song.getTitle(),
					song.getAlbumTitle(),
					song.getArtist().getName()
			));
		}
		return ret;
	}

	private Playlist validatePlaylistId(Long memberId, Long playlistId) {
		Member member = memberRepository.findOne(memberId);
		List<Playlist> allUserPlaylist = playlistRepository.findAllUserPlaylist(member);
		Playlist one = null;
		for (Playlist playlist1 : allUserPlaylist) {
			if (playlist1.getId().equals(playlistId)) {
				one = playlist1;
			}
		}
		return one;
	}

}
