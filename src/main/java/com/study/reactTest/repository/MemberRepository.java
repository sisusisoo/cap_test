package com.study.reactTest.repository;

import com.study.reactTest.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    // JpaRepository를 상속<엔티티클래스, 엔티티클래스의 프라이머리 키가 뭔지>

    // save()를 쓴건 JpaRepository에서 상속 받아서
    // 특정 쿼리를 위해서는 특정 메서드가 필요함.
    // 인터페이스라서 추상 메서드로

    // 이메일로 회원 정보 조회 (select * from member where email=?)
    Optional<Member> findByEmail(String email);
    // Optional은 null 방지해주는 자바에서 제공하는 클래스
    // 모든 repository에서 주고받는 객체는 모두 entity객체로
    Optional<Member> findById(Long id);

}
