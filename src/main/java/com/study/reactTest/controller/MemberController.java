package com.study.reactTest.controller;

import com.study.reactTest.dto.MemberDTO;
import com.study.reactTest.service.MemberService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

//s@CrossOrigin(origins = "*")
//@CrossOrigin(origins = "http://localhost:8080")
@RestController
//@RequestMapping("/api") //
@RequiredArgsConstructor // 롬복에서 제공하는 어노테이션
public class MemberController {
    // 생성자 주입
    private final MemberService memberSerivce; // 이 필드를 매개변수로하는 컨트롤러 생성자를 만들어줌

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody MemberDTO memberDTO, HttpSession session) {
        System.out.println("Received MemberDTO: " + memberDTO);

        // 여기서 request.getEmail(), request.getPassword()를 이용하여
        // 데이터베이스에서 사용자 정보를 조회하고 검사
        MemberDTO loginResult = memberSerivce.login(memberDTO);
        //session.invalidate(); // 기존 세션을 무효화합니다.
        System.out.println("로그인 상태: " + loginResult.getLoginStatus());

        if (loginResult != null) {
            switch (loginResult.getLoginStatus()) {
                case 0:
                    // 아이디가 없음
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid login credentials: User not found");
                case 1:
                    // 비밀번호 불일치
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid login credentials: Wrong password");
                case 2:
                    // 로그인 성공
                    session.setAttribute("loginEmail", loginResult.getMemberEmail());
                    return ResponseEntity.ok().body("Login successful");
                default:
                    // 다른 상태에 대한 처리
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected login status");
            }
        }
        else {
            // 다른 예외적인 상황에 대한 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected login result");
        }
    }
    @PostMapping("/Signup")
    public ResponseEntity<String> save(@RequestBody MemberDTO memberDTO){
        System.out.println("MemberController.save");
        System.out.println("memberDTO = " + memberDTO);

        ResponseEntity<String> httpStatus = memberSerivce.save(memberDTO);
        return httpStatus;
        // MemberService memberService = new MemberService();
        // 스프링에서 이 객체 생성 방식 잘 안씀
    }
    /*
    @GetMapping("/member/save")
    public String saveForm(){
        return "save";
    }
    @PostMapping("/member/save")
    // post방식으로 보냄
    // 서블릿이 작동하지만 구체적인 것은 x
    // @RequestParam을 이용해서 매개변수의 값을 memberEmail로 옮겨담는다.
    /*이런 방법이 있지만
     public String save(@RequestParam("memberEmail") String memberEmail,
                       @RequestParam("memberPassword") String memberPassword,
                       @RequestParam("memberName") String memberName)
    더 편리한 방법이 있다.*/
    /*
    public String save(@ModelAttribute MemberDTO memberDTO){
        // 이 DTO의 필드와 html의 name이 동일하다면
        // DTO객체를 하나 만들어서 SETTER를 호출하면서 자동으로 담아줌
        // @ModelAttribute는 생략 가능

        // soutm 하고 tab
        // 메서드가 제대로 호출되는지 확인
        System.out.println("MemberController.save");
        // soutp: 매개변수
        System.out.println("memberDTO = " + memberDTO);

        memberSerivce.save(memberDTO);
        // MemberService memberService = new MemberService();
        // 스프링에서 이 객체 생성 방식 잘 안씀
        return "login";
    }

    @GetMapping("/member/login")
    public String loginForm(){
        return "login";
    }
    @PostMapping("/member/login")
    public String login(@ModelAttribute MemberDTO memberDTO, HttpSession session){
        // '/member/login' 엔드포인트에 HTTP POST 메서드를 사용하여 액세스할 때 실행되는 코드.

        // 이 메서드는 MemberDTO 객체(컨트롤러와 뷰 간에 데이터를 전달하는 데 사용하는 객체)와
        // HttpSession 객체.

        // `memberSerivce.login(memberDTO)`를 사용하여 로그인을 시도.
        MemberDTO loginResult = memberSerivce.login(memberDTO);
        session.invalidate(); // 기존 세션을 무효화합니다.
        // 최소한의 기능만 구현
        if (loginResult != null){
            // 로그인에 성공한 경우
            session.setAttribute("loginEmail",loginResult.getMemberEmail());
            return "main"; // 'main'으로 이동합니다.
        }
        else{
            return "login";  // 'login' 페이지로 이동합니다.
        }
    }

    // 회원 목록 출력
    @GetMapping("/member/")
    public String findAll(Model model){
        // 어떠한 html로 가져갈 데이터가 있다면 model 사용
        // 이 객체의 data를  list.html에 가져가야 함.
        // 이런 객체를 실어 나르는 model 객체
        List<MemberDTO> memberDTOList = memberSerivce.findAll();
        // 여러 개의 데이터를 가져올 때는 List를 많이 사용

        model.addAttribute("memberList",memberDTOList);
        return "list";
    }

    @GetMapping("/member/{id}")
    public String findById(@PathVariable Integer id, Model model){
        // @PathVariable: 경로상의 {id}값을 Long id에 담아오는 spring의 어노테이션
        // id에 해당하는 회원의 정보를 DB에서 가져와서 화면에 출력하기 위한 model 객체
        MemberDTO memberDTO = memberSerivce.findById(id); // 한 개의 데이터에 대한 조회
        model.addAttribute("member",memberDTO); // ${member.id} html의 member와 mapping
        return "detail";
    }
    */
}
