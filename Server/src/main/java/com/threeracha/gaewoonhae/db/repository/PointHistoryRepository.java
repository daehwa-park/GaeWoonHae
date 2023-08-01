package com.threeracha.gaewoonhae.db.repository;

import com.threeracha.gaewoonhae.db.domain.PointHistory;
import com.threeracha.gaewoonhae.db.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface PointHistoryRepository extends JpaRepository<PointHistory, Long> {
    Optional<PointHistory> findByUserUserIdAndChangeTime(Long userId, Date changeTime);
    Optional<PointHistory> findByUserUserIdAndPointChange(Long userId, int pointChange);

    List<PointHistory> findByUserUserId(long userId);

}
