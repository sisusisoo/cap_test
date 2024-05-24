package com.study.reactTest;

public class StringtoArray {
    public static String[] stringToArray(String foodString){  // 긴 스트링을 스페이스 바 2칸 기준으로 나눠서 배열에 저장

        // OCR한 결과로 나온 foodString을 단어 단위로 쪼개는 함수!!!
        String[] arr = foodString.split(" "); // 공백 2개

        for (String item : arr) {
            System.out.println(item);
        }
        return arr;
    }
}
