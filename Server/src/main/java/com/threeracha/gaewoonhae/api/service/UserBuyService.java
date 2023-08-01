package com.threeracha.gaewoonhae.api.service;

import com.threeracha.gaewoonhae.db.domain.Emoji;
import com.threeracha.gaewoonhae.db.domain.User;
import com.threeracha.gaewoonhae.db.domain.UserBuyEmoji;
import com.threeracha.gaewoonhae.db.repository.UserBuyRepository;
import com.threeracha.gaewoonhae.db.repository.UserRepository;
import com.threeracha.gaewoonhae.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserBuyService {
    private final UserBuyRepository userBuyRepository;
    private final UserRepository userRepository;

    public List<Emoji> getList(Long userId) {

        return userBuyRepository.findByUserUserId(userId)
                .stream()
                .map(UserBuyEmoji::getEmoji)
                .collect(Collectors.toList());

    }

}
