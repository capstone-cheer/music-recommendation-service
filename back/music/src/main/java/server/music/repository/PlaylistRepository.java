package server.music.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import server.music.domain.Member;
import server.music.domain.Playlist;
import server.music.domain.PlaylistSong;

@Repository
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlaylistRepository {

	private final EntityManager em;

	/**
	 * 플레이리스트 저장
	 */
	@Transactional
	public Long save(Playlist playlist) {
		em.persist(playlist);
		return playlist.getId();
	}

	/**
	 * 플레이리스트에 노래 추가
	 */
	@Transactional
	public void add(Playlist playlist, PlaylistSong playlistSong) {
		playlist.addPlaylistSong(playlistSong);
	}

	/**
	 * 플레이리스트 id로 가져오기
	 */
	public Playlist findOne(Long id) {
		return em.find(Playlist.class, id);
	}

	/**
	 * 유저 ID로 플레이리스트 전체 조회
	 */
	public List<Playlist> findAllUserPlaylist(Member member) {
		return em.createQuery("select p from Playlist p where p.member = :member", Playlist.class)
			.setParameter("member", member)
			.getResultList();
	}

	/**
	 * 플레이리스트 썸네일 업데이트
	 */
	public void changeThumbnail(Playlist playlist, String imageUrl) {
		playlist.setImageUrl(imageUrl);
	}
}
