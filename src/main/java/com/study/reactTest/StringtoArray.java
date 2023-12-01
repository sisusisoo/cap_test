package com.study.reactTest;

public class StringtoArray {
    public static String[] stringToArray(){  // 긴 스트링을 스페이스 바 2칸 기준으로 나눠서 배열에 저장
        //String food = "Gamjatang  Chicken Gomtang";
        //String foodString = "불고기 김치 잡채 된장찌개 삼겹살 짱통";
        String foodString =StaticData.FoodList;
        // 현재는 임의로 감자탕이랑 닭곰탕으로 지정해놓음.
        // 이부분은 나중에 전달받은 스트링을 함수변수로 받아오면 됨.
        String[] arr = foodString.split(" "); // 공백 2개

        for (String item : arr) {
            System.out.println(item);
        }
        return arr;
    }
}
