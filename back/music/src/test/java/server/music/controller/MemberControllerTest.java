package server.music.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;

import server.music.member.controller.form.MemberForm;
import server.music.member.controller.MemberController;
import server.music.member.service.MemberService;

@WebMvcTest(MemberController.class)
class MemberControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private MemberService memberService;

	@Test
	public void 회원가입_request() throws Exception {
		//given
		MemberForm memberForm = new MemberForm();
		memberForm.setLoginId("user_id");
		memberForm.setPassword("password");

		//when
		ResultActions result = mockMvc.perform(post("/members/join")
			.contentType(MediaType.APPLICATION_JSON)
			.content(objectMapper.writeValueAsString(memberForm))
		);

		//then
		result.andExpect(
			status().is2xxSuccessful()
		).andDo(print());
	}

}
