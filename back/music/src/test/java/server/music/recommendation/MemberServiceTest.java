package server.music.recommendation;

import static org.assertj.core.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import server.music.member.domain.Member;
import server.music.member.service.MemberService;
import server.music.member.repository.MemberRepository;

@SpringBootTest
@Transactional
class MemberServiceTest {
	@Autowired
	MemberService memberService;
	@Autowired
	MemberRepository memberRepository;

	@Test
	public void 회원가입() throws Exception {
		//given
		Member member = new Member();
		member.setLoginId("id");
		member.setPassword("password");

		//when
		Long registerId = memberService.register(member);

		//then
		Member one = memberRepository.findOne(registerId);
		assertThat(member).isEqualTo(one);
	}

	@Test
	public void 중복회원_검증() throws Exception {
		//given
		Member member1 = new Member();
		Member member2 = new Member();
		member1.setLoginId("sameId");
		member1.setPassword("password");
		member2.setLoginId("sameId");
		member2.setPassword("password");

		//when
		memberService.register(member1);

		//then
		Assertions.assertThrows(IllegalArgumentException.class, () -> {
			memberService.register(member2);
		});
	}

	@Test
	public void 회원목록조회() throws Exception {
		//given
		Member member1 = new Member();
		Member member2 = new Member();
		Member member3 = new Member();
		member1.setLoginId("id1");
		member1.setPassword("password");
		member2.setLoginId("id2");
		member2.setPassword("password");
		member3.setLoginId("id3");
		member3.setPassword("password");

		memberService.register(member1);
		memberService.register(member2);
		memberService.register(member3);

		//when
		List<Member> memberList = memberService.findMemberList();

		//then
		assertThat(memberList).containsExactly(member1, member2, member3);
	}
}