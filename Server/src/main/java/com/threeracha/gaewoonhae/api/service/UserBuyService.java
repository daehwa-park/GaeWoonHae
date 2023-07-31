package com.threeracha.gaewoonhae.api.service;

import com.threeracha.gaewoonhae.db.domain.Emoji;
import com.threeracha.gaewoonhae.db.domain.User;
import com.threeracha.gaewoonhae.db.domain.UserBuyEmoji;
import com.threeracha.gaewoonhae.db.repository.UserBuyRepository;
import com.threeracha.gaewoonhae.db.repository.UserRepository;
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
        User user = userRepository.findById()

        return userBuyRepository.findByUserUserId(user)
                .stream()
                .map(UserBuyEmoji::getEmoji)
                .collect(Collectors.toList());

    }

}
