package com.study.reactTest.dto;

import com.study.reactTest.entity.Member;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor // 기본 생성자를 자동으로 생성해줌
@AllArgsConstructor // 필드를 매개변수로 하는 생성자를 만들어줌
@ToString // DTO객체의 필드값을 출력할 때, 자동으로 문자열로 
public class MemberDTO {
    // 회원정보에 필요한 정보들을 필드로 정의하고,
    // 롬복을 통해 getter와 setter를 사용가능
    // 필드는 private으로
    private Integer id;

    @JsonProperty("email")
    private String memberEmail;
    // 이 DTO의 필드와 html의 name이 동일하다면
    // DTO객체를 하나 만들어서 SETTER를 호출하면서 자동으로 담아줌
    @JsonProperty("password")
    private String memberPassword;
    @JsonProperty("nickname")
    private String memberName;

    private int loginStatus; // 0: 아이디 불일치, 1: 비밀번호 불일치, 2: 로그인 성공

    public static MemberDTO loginIDFailure() {
        MemberDTO dto = new MemberDTO();
        dto.setLoginStatus(0); // 아이디 없음
        return dto;
    }

    public static MemberDTO loginPWFailure() {
        MemberDTO dto = new MemberDTO();
        dto.setLoginStatus(1); // 비밀번호 불일치
        return dto;
    }
    public static MemberDTO loginSuccess(Member member) {
        MemberDTO dto = toMemberDTO(member);
        dto.setLoginStatus(2); // 로그인 성공
        return dto;
    }
    public static MemberDTO toMemberDTO(Member member){
        // entity -> dto 변환 후 리턴
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setId(member.getId());
        memberDTO.setMemberEmail(member.getEmail());
        memberDTO.setMemberPassword(member.getPassword());
        memberDTO.setMemberName(member.getName());
        return memberDTO;
    }
}
