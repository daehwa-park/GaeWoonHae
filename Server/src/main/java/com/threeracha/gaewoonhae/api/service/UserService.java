package com.threeracha.gaewoonhae.api.service;

import com.threeracha.gaewoonhae.api.dto.request.NicknameRequest;
import com.threeracha.gaewoonhae.api.dto.request.ResignUserRequest;
import com.threeracha.gaewoonhae.db.domain.User;
import com.threeracha.gaewoonhae.db.repository.UserRepository;
import com.threeracha.gaewoonhae.exception.CustomException;
import com.threeracha.gaewoonhae.exception.CustomExceptionList;
import com.threeracha.gaewoonhae.utils.oauth.enums.OAuthProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public User getUserInfo(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new CustomException("멤버를 찾을 수 없습니다."));
    }

    public String changeNickname(NicknameRequest nicknameReq) {
        User user = userRepository.findById(nicknameReq.getUserId())
                .orElseThrow(()-> new CustomException("멤버를 찾을 수 없습니다."));

        user.setNickname(nicknameReq.getNickname());
        userRepository.save(user);

        return user.getNickname();
    }

    public int updateUserPoint(Long userId, int changePoint) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException("유저를 찾을 수 없습니다."));

        int currentUserPoint = user.getPoint();
        user.setPoint(currentUserPoint + changePoint);
        userRepository.save(user);

        return user.getPoint();
    }

    public String removeUser(ResignUserRequest resignUserReq) {

        User user = userRepository.findByUserIdAndNickname(resignUserReq.getUserId(), resignUserReq.getNickname())
                .orElseThrow(() -> new CustomException("아이디와 닉네임이 일치하는 정보가 없습니다."));

        /*
            refreshToken이 일치하는지 검증하는 로직 작성 요망 (Redis 설치 후)
         */
        
        userRepository.deleteById(user.getUserId());
        
        /*
            redis에서 삭제 로직
         */

        return "resign complete";
    }
}
