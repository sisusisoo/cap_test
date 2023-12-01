package com.study.reactTest.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.study.reactTest.entity.FoodEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
@Repository
public interface FoodRepository extends JpaRepository<FoodEntity, Long>{
    List<FoodEntity> findByfoodname(String keyword);

}
