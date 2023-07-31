package com.threeracha.gaewoonhae.db.repository;

import com.threeracha.gaewoonhae.db.domain.User;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByUserIdAndNickname(Long userId, String nickname);
}
