package server.music.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import server.music.domain.Member;
import server.music.domain.Playlist;

@Repository
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberRepository {

	private final EntityManager em;

	/**
	 * 멤버 저장
	 */
	@Transactional
	public Long save(Member member) {
		em.persist(member);
		return member.getId();
	}

	/**
	 * 멤버 pk로 조회
	 */
	public Member findOne(Long id) {
		return em.find(Member.class, id);
	}

	/**
	 * 멤버 로그인 ID로 조회
	 */
	public List<Member> findByLoginID(String loginID) {
		return em.createQuery("select m from Member m where m.login_id = :login_id", Member.class)
			.setParameter("login_id", loginID)
			.getResultList();
	}

	/**
	 * 플레이리스트 추가
	 */
	@Transactional
	public void addPlaylist(Member member, Playlist playlist) {
		List<Playlist> playlistList = member.getPlaylistList();
		playlistList.add(playlist);
	}
}
