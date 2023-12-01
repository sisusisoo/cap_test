package com.study.reactTest.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
@Entity
@Table(name = "foodtable")
@Getter
@Setter
public class FoodEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Foodname", length = 255)
    private String foodname;

    @Column(name = "Foodingredient", length = 255)
    private String foodingredient;

    @Lob
    @Column(name = "Foodimagepath")
    private String foodimagepath;

    @Column(name = "Foodprofile", columnDefinition = "text")
    private String foodprofile;

    @Column(name = "Foodcalorie")
    private Double foodcalorie;

    @Column(name = "Foodprotein")
    private Double foodprotein;

    @Column(name = "Foodfat")
    private Double foodfat;

    @Column(name = "Foodcarbohydrate")
    private Double foodcarbohydrate;

    @Column(name = "Foodsugars")
    private Double foodsugars;

    @Column(name = "Foodcalcium")
    private Double foodcalcium;

    @Column(name = "Foodiron")
    private Double foodiron;

    @Column(name = "Foodpotassium")
    private Double foodpotassium;

    @Column(name = "Foodsalt")
    private Double foodsalt;


    public FoodEntity() {
        // 기본 생성자 내용이 필요하면 여기에 추가할 수 있습니다.
    }
    @Builder
    public FoodEntity(Long Id, String Foodname, String Foodimage, String Foodingredient,
                      String Foodprofile, Double Foodcalorie, Double Foodprotein, Double Foodfat,
                      Double Foodcarbohydrate, Double Foodsugars, Double Foodcalcium, Double Foodiron,
                      Double Foodpotassium, Double Foodsalt) {
        this.id = Id;
        this.foodname = Foodname;
        this.foodimagepath = Foodimage;
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

/*
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "foodtable")
public class FoodEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column
    private String foodname;

    @Column
    private byte[] Foodimage;

    @Column
    private String Foodingredient;

    @Column
    private String Foodprofile;

    @Column
    private Double Foodcalorie;

    @Column
    private Double Foodprotein;

    @Column
    private Double Foodfat;

    @Column
    private Double Foodcarbohydrate;

    @Column
    private Double Foodsugars;

    @Column
    private Double Foodcalcium;

    @Column
    private Double Foodiron;

    @Column
    private Double Foodpotassium;

    @Column
    private Double Foodsalt;

    @Builder
    public FoodEntity(Long Id, String foodname, byte[] Foodimage, String Foodingredient,
                String Foodprofile, Double Foodcalorie, Double Foodprotein, Double Foodfat,
                Double Foodcarbohydrate, Double Foodsugars, Double Foodcalcium, Double Foodiron,
                Double Foodpotassium, Double Foodsalt){
        this.Id = Id;
        this.foodname = foodname;
        this.Foodimage = Foodimage;
        this.Foodingredient = Foodingredient;
        this.Foodprofile = Foodprofile;
        this.Foodcalorie = Foodcalorie;
        this.Foodprotein = Foodprotein;
        this.Foodfat = Foodfat;
        this.Foodcarbohydrate = Foodcarbohydrate;
        this.Foodsugars = Foodsugars;
        this.Foodcalcium = Foodcalcium;
        this.Foodiron = Foodiron;
        this.Foodpotassium = Foodpotassium;
        this.Foodsalt = Foodsalt;
    }
}
*/
