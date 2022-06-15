package server.music.integration;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import server.music.member.domain.Member;
import server.music.member.repository.MemberRepository;
import server.music.member.service.MemberService;
import server.music.playlist.service.PlaylistService;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class PlaylistIntegrationTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private MemberService memberService;
	@Autowired
	private MemberRepository memberRepository;
	@Autowired
	private PlaylistService playlistService;

	@BeforeEach
	public void init() {

		Member member = new Member();
		member.setLoginId("user1");
		member.setPassword("password");
		memberRepository.save(member);
	}

	// @Test
	// public void 재생목록_생성_request() throws Exception {
	// 	//given
	// 	Member member = memberRepository.findByLoginID("user1").get(0);
	// 	Long memberId = member.getId();
	//
	// 	final String playlistName = "새로운 재생목록";
	// 	PlaylistForm playlistForm = new PlaylistForm();
	// 	playlistForm.setName(playlistName);
	//
	// 	final String expectedResponse = String.format("{"
	// 			+ "\"playlistId\" : %d,"
	// 			+ "\"name\" : \"%s\","
	// 			+ "\"imageUrl\" : \"%s\""
	// 			+ "}"
	// 		, 2, playlistName, Default.THUMBNAIL);
	//
	// 	//when
	// 	ResultActions result = mockMvc.perform(
	// 		post(String.format("/playlists/%d/create", memberId))
	// 			.contentType(MediaType.APPLICATION_JSON)
	// 			.content(objectMapper.writeValueAsString(playlistForm))
	// 	);
	//
	// 	//then
	//
	// 	result.andExpect(
	// 		content().contentType(MediaType.APPLICATION_JSON)
	// 	).andExpect(
	// 		content().json(expectedResponse)
	// 	).andExpect(
	// 		status().is2xxSuccessful()
	// 	).andDo(print());
	// }

}
