package com.study.reactTest.dto;

import com.study.reactTest.entity.FoodEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Base64;

@Getter
@Setter
public class FoodDTO {
    private Long Id;
    private String korfoodname;//추가
    private String foodname;
   // private String foodimagepath;//수정
    private String foodimage;
    private String foodingredient;
    private String foodprofile;
    private Double foodcalorie;
    private Double foodprotein;
    private Double foodfat;
    private Double foodcarbohydrate;
    private Double foodsugars;
    private Double foodcalcium;
    private Double foodiron;
    private Double foodpotassium;
    private Double foodsalt;

    public FoodEntity toEntity(){
        FoodEntity build = FoodEntity.builder()
                .Id(Id)
                .Korfoodname(korfoodname)
                .Foodname(foodname)
                //.Foodimage(foodimagepath)//수정
                .Foodimage(foodimage)
                .Foodingredient(foodingredient)
                .Foodprofile(foodprofile)
                .Foodcalorie(foodcalorie)
                .Foodprotein(foodprotein)
                .Foodfat(foodfat)
                .Foodcarbohydrate(foodcarbohydrate)
                .Foodsugars(foodsugars)
                .Foodcalcium(foodcalcium)
                .Foodiron(foodiron)
                .Foodpotassium(foodpotassium)
                .Foodsalt(foodsalt)
                .build();
        return build;
    }

    public FoodDTO(){

    }
    @Builder
    public FoodDTO(Long Id, String Korfoodname,String Foodname, String Foodingredient, String Foodimage,
                      String Foodprofile, Double Foodcalorie, Double Foodprotein, Double Foodfat,
                      Double Foodcarbohydrate, Double Foodsugars, Double Foodcalcium, Double Foodiron,
                      Double Foodpotassium, Double Foodsalt){
        this.Id = Id;
        this.korfoodname = Korfoodname;
        this.foodname = Foodname;
        //this.foodimagepath = Foodimage;//수정
        this.foodimage = Foodimage;
        this.foodingredient = Foodingredient;
        this.foodprofile = Foodprofile;
        this.foodcalorie = Foodcalorie;
        this.foodprotein = Foodprotein;
        this.foodfat = Foodfat;
        this.foodcarbohydrate = Foodcarbohydrate;
        this.foodsugars = Foodsugars;
        this.foodcalcium = Foodcalcium;
        this.foodiron = Foodiron;
        this.foodpotassium = Foodpotassium;
        this.foodsalt = Foodsalt;
    }
}
