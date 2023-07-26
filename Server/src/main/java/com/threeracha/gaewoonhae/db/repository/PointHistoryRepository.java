package com.threeracha.gaewoonhae.db.repository;

import com.threeracha.gaewoonhae.db.domain.PointHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PointHistoryRepository extends JpaRepository<PointHistory, Integer> {
    Optional<PointHistory> findByUserIdAndChangeTime(int userId, String changeTime);
    Optional<PointHistory> findByUserIdAndPointChange(int userId, int pointChange);


}
