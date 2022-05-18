package server.music.service;

import static org.assertj.core.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import server.music.domain.Member;
import server.music.domain.Playlist;
import server.music.repository.MemberRepository;
import server.music.repository.PlaylistRepository;

@SpringBootTest
@Transactional
class PlaylistServiceTest {

	@Autowired
	MemberService memberService;
	@Autowired
	MemberRepository memberRepository;
	@Autowired
	PlaylistService playlistService;
	@Autowired
	PlaylistRepository playlistRepository;

	@BeforeEach
	public void init() {

		Member member = new Member();
		member.setLoginId("user1");
		member.setPassword("password");
		memberRepository.save(member);
	}

	@Test
	public void 플레이리스트_생성() throws Exception {
		//given
		Member member = memberRepository.findByLoginID("user1").get(0);
		String playlistName = "새로운 재생목록";

		//when
		Long playlistId = playlistService.createPlaylist(member, playlistName);

		//then
		assertThat(playlistRepository.findOne(playlistId).getName()).isEqualTo(playlistName);

	}

	@Test
	public void 모든_사용자_플레이리스트_조회() throws Exception {
		//given
		Member member = memberRepository.findByLoginID("user1").get(0);
		String playlistName1 = "새로운 재생목록1";
		String playlistName2 = "새로운 재생목록2";
		String playlistName3 = "새로운 재생목록3";

		Playlist playlist1 = Playlist.createPlaylist(playlistName1, member);
		Playlist playlist2 = Playlist.createPlaylist(playlistName2, member);
		Playlist playlist3 = Playlist.createPlaylist(playlistName3, member);

		playlistRepository.save(playlist1);
		playlistRepository.save(playlist2);
		playlistRepository.save(playlist3);

		//when
		List<Playlist> allUserPlaylist = playlistService.findAllUserPlaylist(member.getId());

		//then
		assertThat(allUserPlaylist).containsExactly(playlist1, playlist2, playlist3);
	}

}