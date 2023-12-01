package com.study.reactTest.service;

import java.util.Arrays;
import java.util.List;
import jakarta.transaction.Transactional;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.study.reactTest.dto.FoodDTO;
import com.study.reactTest.entity.FoodEntity;
import com.study.reactTest.repository.FoodRepository;

@Service //스프링이 관리해주는 객체 == 스프링 빈
 //controller와 같이. final 멤버변수 생성자 만드는 역할
public class FoodService {

    @Autowired
    private final FoodRepository foodRepository; // 먼저 jpa, mysql dependency 추가

    public FoodService(FoodRepository foodRepository){

        this.foodRepository = foodRepository;
    }

    @Transactional
    public List<FoodDTO> searchFood(String[] keyword) {

        for(int i = 0; i<keyword.length; i++){
            System.out.println(keyword[i]);
        }
        List<FoodEntity> food = null;
        List<FoodDTO> foodDtoList = new ArrayList<>();
        for (int i = 0; i < keyword.length; i++) {  // for문을 이용해서 배열의 처음부터 끝까지 차례대로 음식이름에 해당하는 음식 데이터를 가져옴.
            food = foodRepository.findByfoodname(keyword[i]);

            System.out.println("Food List for " + keyword[i] + ": " + Arrays.toString(food.toArray()));

            for (FoodEntity foodentity : food) {
                foodDtoList.add(this.convertEntityToDto(foodentity));
            }
        }
        return foodDtoList;
    }

    private FoodDTO convertEntityToDto(FoodEntity foodentity){
        return FoodDTO.builder()
                .Id(foodentity.getId())
                .Foodname(foodentity.getFoodname())
                .Foodimage(foodentity.getFoodimagepath())
                .Foodingredient(foodentity.getFoodingredient())
                .Foodprofile(foodentity.getFoodprofile())
                .Foodcalorie(foodentity.getFoodcalorie())
                .Foodprotein(foodentity.getFoodprotein())
                .Foodfat(foodentity.getFoodfat())
                .Foodcarbohydrate(foodentity.getFoodcarbohydrate())
                .Foodsugars(foodentity.getFoodsugars())
                .Foodcalcium(foodentity.getFoodcalcium())
                .Foodiron(foodentity.getFoodiron())
                .Foodpotassium(foodentity.getFoodpotassium())
                .Foodsalt(foodentity.getFoodsalt())
                .build();
    }

}