package com.study.reactTest.controller;

import lombok.RequiredArgsConstructor;
import com.study.reactTest.dto.FoodDTO;
import com.study.reactTest.StringtoArray;
import com.study.reactTest.service.FoodService;
import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@RequestMapping("/images")
@RequiredArgsConstructor // 롬복에서 제공하는 어노테이션
public class FoodController {
    // 생성자 주입
    private final FoodService foodService; // 이 필드를 매개변수로하는 컨트롤러 생성자를 만들어줌

    @PostMapping("/upload")
    public List<FoodDTO> compareFood(@RequestParam("image") MultipartFile image) {
        try {
            byte[] imageData = image.getBytes(); // 받아온 이미지 데이터
            // 여기에 Python OCR 연동 코드를 추가하시면 됩니다
        }
        catch (IOException e) {
            e.printStackTrace();
            return List.of(); // 빈 리스트 반환
        }
        String foodString = "불고기 김치 잡채 된장찌개 삼겹살 짱통";
        String[] array = StringtoArray.stringToArray(foodString);  // 배열 만들어서 안에 음식이름 차례대로 삽입
        List<FoodDTO> foodDtoList = foodService.searchFood(array);  // 리스트 만들어서 서비스 이용해서 해당 음식 데이터 가져오기

        for (FoodDTO foodDTO : foodDtoList) {
            System.out.println("ID: " + foodDTO.getId());
            System.out.println("Name: " + foodDTO.getFoodname());
            System.out.println("Foodimagepath: " + foodDTO.getFoodimagepath());
            System.out.println("Foodingredient: " + foodDTO.getFoodingredient());
            System.out.println("Foodprofile: " + foodDTO.getFoodprofile());
            System.out.println("Foodcalorie: " + foodDTO.getFoodcalorie());
            System.out.println("Foodprotein: " + foodDTO.getFoodprotein());
            System.out.println("Foodfat: " + foodDTO.getFoodfat());
            System.out.println("Foodcarbohydrate: " + foodDTO.getFoodcarbohydrate());
            System.out.println("Foodsugars: " + foodDTO.getFoodsugars());
            System.out.println("Foodcalcium: " + foodDTO.getFoodcalcium());
            System.out.println("Foodiron: " + foodDTO.getFoodiron());
            System.out.println("Foodpotassium: " + foodDTO.getFoodpotassium());
            System.out.println("Foodsalt: " + foodDTO.getFoodsalt());
            foodDTO.setBase64Image("");
        }
        return foodDtoList;
    }
}

/*
@Controller
public class FoodController {
    private final FoodService foodService;

    @GetMapping("/")
    public String list(){
        return "search";
    }

    public FoodController(FoodService foodService){
        this.foodService = foodService;
    }
    @GetMapping("/member/search")
    public String find(Model model){
        String[] array = StringtoArray.stringtoarray();  // 배열 만들어서 안에 음식이름 차례대로 삽입

        List<FoodDTO> foodDtoList = foodService.searchFood(array);  // 리스트 만들어서 서비스 이용해서 해당 음식 데이터 가져오기

        model.addAttribute("foodList", foodDtoList);  // 모델 객체 사용해서 뷰로 전송
        return "search";
    }
}
*/
