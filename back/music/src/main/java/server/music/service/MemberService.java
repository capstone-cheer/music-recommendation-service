package server.music.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import server.music.domain.Member;
import server.music.repository.MemberRepository;

@Service
@RequiredArgsConstructor
public class MemberService {

	private final MemberRepository memberRepository;

	/**
	 * 회원가입
	 */
	public Long register(Member member) {
		validateMember(member);
		return memberRepository.save(member);
	}

	//중복회원 검증
	private void validateMember(Member member) {
		List<Member> findMember = memberRepository.findByLoginID(member.getLoginId());
		if (!findMember.isEmpty()) {
			throw new IllegalArgumentException("이미 존재하는 회원입니다.");
		}
	}

	/**
	 * 회원 목록 조회
	 */
	public List<Member> findMemberList(){
		return memberRepository.findAll();
	}
}
