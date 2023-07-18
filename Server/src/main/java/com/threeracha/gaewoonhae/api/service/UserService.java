package com.threeracha.gaewoonhae.api.service;

import com.threeracha.gaewoonhae.api.dto.KakaoTokenDTO;
import com.threeracha.gaewoonhae.db.domain.User;
import com.threeracha.gaewoonhae.db.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    final UserRepository userRepository;

    public User getUserInfo(KakaoTokenDTO token) {
        return userRepository.findByEmail(token.getEmail())
                .orElse(null);
    }



}
