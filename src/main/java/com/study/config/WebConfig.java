package com.study.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*") // 모든 출처 허용
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP method 추가
                .allowedHeaders("*") // 모든 헤더 허용
                .allowCredentials(true) // 쿠키 인증 요청 허용
                .maxAge(3600); // 원하는 시간만큼 pre-flight 리퀘스트를 캐싱
    }
}