package com.threeracha.gaewoonhae.db.repository;

import com.threeracha.gaewoonhae.db.domain.User;
import com.threeracha.gaewoonhae.db.domain.UserBuyEmoji;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserBuyRepository extends JpaRepository<UserBuyEmoji, Long> {
    //Optional<UserBuyEmoji> findByBuyId(int buyId);

    List<UserBuyEmoji> findByUserUserId(long userId);
}
