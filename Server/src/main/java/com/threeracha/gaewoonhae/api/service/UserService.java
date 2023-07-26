package com.threeracha.gaewoonhae.api.service;

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

    final UserRepository userRepository;

    public User getUserInfo(Long userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR));
    }

    public User updateUser(Long userId) {
        User user = userRepository.findByUserId(userId).get();
        user.setPoint(100);
        userRepository.flush();

        return user;
    }

//    public User getUserPoint(int userId) {
//        return userRepository.findBy(userId)
//                .orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR));
//    }

}
