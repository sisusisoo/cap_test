package com.study.reactTest.entity;

import com.study.reactTest.dto.MemberDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

// 엔티티클래스가 테이블 역할을 함.
// 데이터베이스의 테이블을 자바 객체처럼 사용할 수 있음
@Entity // DB에 있는 테이블을 의미
// jpa가 이것을 일겅드림
// 테이블에 관한 설정이구나 하면서 다 읽은 후 처리
@Getter
@Setter
@Table(name = "member")
public class Member {
    @Id // 프라이머리 키 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private Integer id;
    private String email;
    private String password;
    private String name;

    public static Member toMemberEntity(MemberDTO memberDTO){
        Member member = new Member();
        member.setEmail(memberDTO.getMemberEmail());
        member.setPassword(memberDTO.getMemberPassword());
        member.setName(memberDTO.getMemberName());
        return member;
    }

    /*
    private Long id;

    @Column(unique = true)
    private String memberEmail;
    @Column
    private String memberPassword;
    @Column
    private String memberName;
    */

}

