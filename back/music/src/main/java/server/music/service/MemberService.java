package server.music.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import server.music.domain.Member;
import server.music.repository.MemberRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

	private final MemberRepository memberRepository;

	/**
	 * 회원가입
	 */
	@Transactional
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
	public List<Member> findMemberList() {
		return memberRepository.findAll();
	}

	public Member findOne(Long memberId) {
		return memberRepository.findOne(memberId);
	}

	public void login(Member member) {
		List<Member> members = memberRepository.findByLoginID(member.getLoginId());
		if (members.isEmpty()) {
			throw new IllegalArgumentException("존재하지 않는 회원입니다.");
		}
		if (!members.get(0).getPassword()
				.equals(member.getPassword())) {
			throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
		}
	}
}
