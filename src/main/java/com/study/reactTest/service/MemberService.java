package com.study.reactTest.service;

import com.study.reactTest.dto.MemberDTO;
import com.study.reactTest.entity.Member;
import com.study.reactTest.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    public ResponseEntity<String> save(MemberDTO memberDTO) {
        Optional<Member> byMemberEmail = memberRepository.findByEmail(memberDTO.getMemberEmail());

        if (byMemberEmail.isPresent()) {
            // 이미 동일한 이메일로 가입된 회원이 있다면 409 Conflict 상태 코드와 메시지를 반환
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is already in use");
        } else {
            // 동일한 이메일이 없으면 회원 가입을 처리하고 200 OK 상태 코드와 성공 메시지를 반환
            Member member = Member.toMemberEntity(memberDTO);
            memberRepository.save(member);
            return ResponseEntity.ok("Member registered successfully");
        }
    }
    public MemberDTO login(MemberDTO memberDTO){
        /*
           1. 회원이 입력한 이메일로 DB에서 조회를 함
           2. DB에서 조회한 비밀번호와 사용자가 입력한 비밀번호가 일치하는지 판단
        */
        System.out.println("Input MemberDTO: " + memberDTO.getMemberEmail());
        Optional<Member> byMemberEmail = memberRepository.findByEmail(memberDTO.getMemberEmail());
        //System.out.println("Input MemberDTO: " + byMemberEmail);
        // 포장지가 두개인 개념
        if (byMemberEmail.isPresent()){
            // 조회 결과가 있다(해당 이메일을 가진 회원 정보가 있다)
            Member member = byMemberEmail.get(); // Optional로 감싸진 객체를 벗겨냄
            System.out.println("[#1] Input MemberDTO: " + memberDTO.getMemberPassword());
            System.out.println("[#2] DB MemberEmail: " + member.getEmail());
            if ( member.getPassword().equals(memberDTO.getMemberPassword())) {
                // DB의 비밀번호와 입력한 값을 비교
                // 비밀번호 일치
                // 정보를 컨트롤러로 넘겨줘야됨. DTO로 넘겨줄 예정.
                // entity클래스 객체를 어디까지 사용할 것인가.
                // 강의는 Service에서만 사용.

                // entity -> dto 변환 후 리턴
                MemberDTO dto = MemberDTO.loginSuccess(member);
                return dto;
            }
            else{
                // 비밀번호 불일치(로그인 실패)
                MemberDTO dto = MemberDTO.loginPWFailure();
                return dto;
            }
        }
        else{
            // 조회 결과가 없다(해당 이메일을 가진 회원이 없다)
            MemberDTO dto = MemberDTO.loginIDFailure();
            return dto;
        }
    }

    public List<MemberDTO> findAll() {
        List<Member> memberEntityList = memberRepository.findAll();// 레포지터리에서 만들어주는 메서드
        // Alt + enter : 자동 완성
        List<MemberDTO> memberDTOList = new ArrayList<>();
        // DTO 객체를 담기 위한 리스트
        // 엔티티가 여러개가 담긴 List 객체를 DTO가 여러개 담긴 List객체로 옮겨담는 과정.
        // 하나 하나씩 꺼내서 옮겨담아야 함.
        for (Member member: memberEntityList){ // foreach문법
            memberDTOList.add(MemberDTO.toMemberDTO(member));
//            MemberDTO memberDTO = MemberDTO.toMemberDTO(member); 위와 같음.
//            memberDTOList.add(memberDTO);
        }
        return memberDTOList;
    }

    public MemberDTO findById(Integer id) {
        Optional<Member> optionalMemberEntity = memberRepository.findById(id);
        if (optionalMemberEntity.isPresent()){
//            Member memberEntity = optionalMemberEntity.get();
//            MemberDTO memberDTO = MemberDTO.toMemberDTO(memberEntity);
//            return memberDTO;
            return MemberDTO.toMemberDTO((optionalMemberEntity.get()));
            // get(): Optional로 감싸진 객체를 벗겨냄
            // 위 3줄을 요약
        } else{
            return null;
        }
    }
}
