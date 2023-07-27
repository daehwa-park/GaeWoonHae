package com.threeracha.gaewoonhae.api.service;

import com.threeracha.gaewoonhae.api.dto.request.NicknameRequest;
import com.threeracha.gaewoonhae.db.domain.User;
import com.threeracha.gaewoonhae.db.repository.UserRepository;
import com.threeracha.gaewoonhae.exception.CustomException;
import com.threeracha.gaewoonhae.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public User getUserInfo(Long userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR));
    }

    public String changeNickname(NicknameRequest nicknameReq) {
        User user = userRepository.findByUserId(nicknameReq.getUserId())
                .orElseThrow(()-> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR));

        user.setNickname(nicknameReq.getNickname());
        userRepository.save(user);

        return user.getNickname();
    }

    public int updateUserPoint(Long userId, int changePoint) {

        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR));

        int currentUserPoint = user.getPoint();
        user.setPoint(currentUserPoint + changePoint);
        userRepository.save(user);

        return user.getPoint();
    }
}
