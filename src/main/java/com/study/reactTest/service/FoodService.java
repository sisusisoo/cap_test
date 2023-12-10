package com.study.reactTest.service;

import java.util.Arrays;
import java.util.List;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.Optional;

import org.hibernate.query.NativeQuery;
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
    public FoodDTO getFoodInfo(long foodId){
        /*
           1. 회원이 입력한 이메일로 DB에서 조회를 함
           2. DB에서 조회한 비밀번호와 사용자가 입력한 비밀번호가 일치하는지 판단
        */
        System.out.println("FoodId is " + foodId);
        Optional<FoodEntity> byFoodId = foodRepository.findById(foodId);
        //System.out.println("Input MemberDTO: " + byMemberEmail);
        // 포장지가 두개인 개념
        if (byFoodId.isPresent()){
            // 조회 결과가 있다(해당 이메일을 가진 회원 정보가 있다)
            FoodEntity foodEntity = byFoodId.get(); // Optional로 감싸진 객체를 벗겨냄
            System.out.println("Input MemberDTO: " + foodEntity.getFoodname());

            FoodDTO dto = convertEntityToDto(foodEntity);
            return dto;
        }
        else{
            return null;
        }
    }
    @Transactional
    public List<FoodDTO> searchFood(String[] keyword) {

        for(int i = 0; i<keyword.length; i++){
            System.out.println(keyword[i]);
        }
        List<FoodEntity> food = null;
        List<FoodDTO> foodDtoList = new ArrayList<>();
        for (int i = 0; i < keyword.length; i++) {  // for문을 이용해서 배열의 처음부터 끝까지 차례대로 음식이름에 해당하는 음식 데이터를 가져옴.
            //food = foodRepository.findByfoodname(keyword[i]);//수정
            food = foodRepository.findBykorfoodname(keyword[i]);
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
                .Korfoodname(foodentity.getKorfoodname())
                .Foodname(foodentity.getFoodname())
                //.Foodimage(foodentity.getFoodimagepath())//수정
                .Foodimage(foodentity.getFoodimage())
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