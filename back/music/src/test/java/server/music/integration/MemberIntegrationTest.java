package server.music.integration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import server.music.member.controller.form.MemberForm;
import server.music.member.domain.Member;
import server.music.member.service.MemberService;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class MemberIntegrationTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private MemberService memberService;

	@Autowired
	private ObjectMapper objectMapper;

	@Test
	public void 회원_중복() throws Exception {
		//given
		Member member = new Member();
		member.setLoginId("id1");
		member.setPassword("password");

		MemberForm memberForm = new MemberForm();
		memberForm.setLoginId("id1");
		memberForm.setPassword("password");

		//when
		memberService.register(member);
		List<Member> memberList = memberService.findMemberList();
		System.out.println(memberList.get(0).getId());

		ResultActions result = mockMvc.perform(post("/members/join")
			.contentType(MediaType.APPLICATION_JSON)
			.content(objectMapper.writeValueAsString(memberForm))
		);

		//then
		result.andExpect(
			status().is4xxClientError()
		).andDo(print());

	}
}
