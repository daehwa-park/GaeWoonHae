package com.threeracha.gaewoonhae.api.service;

import com.threeracha.gaewoonhae.api.dto.request.BuyEmojiRequest;
import com.threeracha.gaewoonhae.api.dto.request.NicknameRequest;
import com.threeracha.gaewoonhae.db.domain.Emoji;
import com.threeracha.gaewoonhae.api.dto.request.ResignUserRequest;
import com.threeracha.gaewoonhae.db.domain.User;
import com.threeracha.gaewoonhae.db.repository.EmojiRepository;
import com.threeracha.gaewoonhae.db.repository.UserRepository;
import com.threeracha.gaewoonhae.exception.CustomException;
import com.threeracha.gaewoonhae.exception.CustomExceptionList;
import com.threeracha.gaewoonhae.utils.oauth.enums.OAuthProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final EmojiRepository emojiRepository;

    public User getUserInfo(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));
    }
    @Transactional(readOnly = false)
    public String changeNickname(NicknameRequest nicknameReq) {
        User user = userRepository.findById(nicknameReq.getUserId())
                .orElseThrow(()-> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));

        user.setNickname(nicknameReq.getNickname());
        userRepository.save(user);

        return user.getNickname();
    }

    @Transactional(readOnly = false)
    public Long changeEmoji(BuyEmojiRequest emojiReq) {
        User user = userRepository.findById(emojiReq.getUserId())
                .orElseThrow(()-> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));
        Emoji newEmoji = emojiRepository.findById(emojiReq.getEmojiId())
                    .orElseThrow(()-> new CustomException(CustomExceptionList.EMOJI_NOT_FOUND_ERROR));

        user.setEmoji(newEmoji);
        userRepository.save(user);

        return user.getEmoji().getEmojiId();
    }

    @Transactional(readOnly = false)
    public int updateUserPoint(Long userId, int changePoint) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));

        int currentUserPoint = user.getPoint();
        user.setPoint(currentUserPoint + changePoint);
        userRepository.save(user);

        return user.getPoint();
    }


    public String removeUser(ResignUserRequest resignUserReq) {

        User user = userRepository.findByUserIdAndNickname(resignUserReq.getUserId(), resignUserReq.getNickname())
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));

        if (user.getNickname().equals(resignUserReq.getNickname()) &&
                user.getRefreshToken().equals(resignUserReq.getRefreshToken())) {
            userRepository.deleteById(user.getUserId());
            return "success";
        } else {
            return "fail";
        }
    }
}
