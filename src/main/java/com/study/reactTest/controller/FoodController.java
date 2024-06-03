package com.study.reactTest.controller;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import com.study.reactTest.dto.FoodDTO;
import com.study.reactTest.StringtoArray;
import com.study.reactTest.service.FoodService;
import org.springframework.ui.Model;

import java.util.Base64;
import java.util.List;

import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor // 롬복에서 제공하는 어노테이션
public class FoodController {
    // 생성자 주입
    private final FoodService foodService; // 이 필드를 매개변수로하는 컨트롤러 생성자를 만들어줌

    @PostMapping("/compare-food")
    public List<FoodDTO> compareFood(@RequestBody String foodName) {
        String[] array = StringtoArray.stringToArray(foodName); // 배열 만들어서 안에 음식이름 차례대로 삽입
        List<FoodDTO> foodDtoList = foodService.searchFood(array);  // 리스트 만들어서 서비스 이용해서 해당 음식 데이터 가져오기

        for (FoodDTO foodDTO : foodDtoList) {
            System.out.println("ID: " + foodDTO.getId());
            System.out.println("KorName: " + foodDTO.getKorfoodname());//추가
            System.out.println("Name: " + foodDTO.getFoodname());
            //System.out.println("Foodimagepath: " + foodDTO.getFoodimagepath());//수정
            System.out.println("Foodimage: " + foodDTO.getFoodimage());
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
        }
        return foodDtoList;
    }
    @PostMapping("/food")
    public FoodDTO compareFoodGet(@RequestBody String id) {
        // Your logic for handling GET requests
        System.out.println(id);

        Long foodId = Long.parseLong(id);
        FoodDTO foodDTO = foodService.getFoodInfo(foodId);
        System.out.println("Menu Detail[FoodName]" + foodDTO.getFoodname());
        System.out.println("Menu Detail[FoodName]" + foodDTO.getKorfoodname());//추가
        return foodDTO;
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
