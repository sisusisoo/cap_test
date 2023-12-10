package com.study.reactTest.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.study.reactTest.entity.FoodEntity;
import java.util.List;
import java.util.Optional;

@Repository
public interface FoodRepository extends JpaRepository<FoodEntity, Long>{
    List<FoodEntity> findByfoodname(String keyword);
    List<FoodEntity> findBykorfoodname(String keyword);
    Optional<FoodEntity> findById(Long id);
    // food.id 를 통한 검색
}
