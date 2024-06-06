package com.study.reactTest;

public class StringtoArray {
    public static String[] stringToArray(String foodName){
        String[] arr = foodName.split(",");
        for (String item : arr) {
            System.out.println(item);
<<<<<<< HEAD
=======
        }
        return arr;
    }

    public static String[] stringToArray(){  // 긴 스트링을 스페이스 바 2칸 기준으로 나눠서 배열에 저장
        //String food = "Gamjatang  Chicken Gomtan";
        //String foodString = "불고기 김치 잡채 된장찌개 삼겹살 짱통";
        String foodString = StaticData.FoodList;
        String[] arr = foodString.split(" "); //
        for (String item : arr) {
            System.out.println(item);
>>>>>>> 0bc70600ad971915cfe9fed51c8bcd77556398fe
        }
        return arr;
    }

    public static String[] stringToArray(){  // 긴 스트링을 스페이스 바 2칸 기준으로 나눠서 배열에 저장
        //String food = "Gamjatang  Chicken Gomtan";
        //String foodString = "불고기 김치 잡채 된장찌개 삼겹살 짱통";
        String foodString = StaticData.FoodList;
        String[] arr = foodString.split(","); //
        for (String item : arr) {
            System.out.println(item);
        }
        return arr;
    }
}