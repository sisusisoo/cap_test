package com.study.reactTest;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//import javax.servlet.http.HttpServletRequest;
import jakarta.servlet.ServletOutputStream;



import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
@ResponseBody
public class HomeController {

	@RequestMapping(value = "/test1", method = RequestMethod.GET)//이거 조심
	public String home(Model model) {
		model.addAttribute("serverTime");
		return "sendView";
	}
//오창은 테스트
	@RequestMapping(value = "/upload.do", method = RequestMethod.POST)
	public void fileUpload(MultipartHttpServletRequest multipartRequest, HttpServletResponse response) {
		// 추가데이터 테스트
		System.out.println("컨트롤러-------------------");
		System.out.println("이건가1"+multipartRequest);
		//getParameter가 NULL이 나옴


		//String filePath = "/temp";//이거 없애기
		String filePath = "";
		System.out.println("디버깅"+multipartRequest.getPathInfo());

		System.out.println("컨트롤러1");
		HandlerFile handlerFile = new HandlerFile(multipartRequest, filePath);
		System.out.println("컨트롤러2");


		Map<String, List<String>> fileNames = handlerFile.getUploadFileName();
		// 실제저장파일명과 원본파일명 DB저장처리

		// 클라이언트 객체
		System.err.println(fileNames.toString());
		String fileName = handlerFile.getFileFullPath();//-----------------
		System.out.println("파일이름 :"+fileName);
		System.out.println("컨트롤러3");
		Client client = new Client(fileName);
		System.out.println("컨트롤러4");
		String result = client.getResult();
		String js;
		ServletOutputStream out;


		try {
			response.setContentType("text/html; charset=UTF-8");
			out = response.getOutputStream();

			if (result.equals("null") || result.equals("fail")) {
				js = "<script>history.back(); alert('Result : Error! Page Reload!');</script>";
			} else {
				js = "<script>alert('Result : "+result+"'); location.href='https://www.google.co.kr/search?q=" + result + "'</script>";
			}

			//out.println(js);
			//out.flush();

		} catch(Exception e) {
			e.printStackTrace();
		}// catch

	}// fileUpload

}