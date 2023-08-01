package com.threeracha.gaewoonhae.api.service;

import com.threeracha.gaewoonhae.api.dto.request.BuyEmojiRequest;
import com.threeracha.gaewoonhae.api.dto.request.NicknameRequest;
import com.threeracha.gaewoonhae.db.domain.Emoji;
import com.threeracha.gaewoonhae.db.domain.User;
import com.threeracha.gaewoonhae.db.repository.EmojiRepository;
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
    private final EmojiRepository emojiRepository;

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
    public Long changeEmoji(BuyEmojiRequest emojiReq) {
        User user = userRepository.findById(emojiReq.getUserId())
                .orElseThrow(()-> new CustomException("멤버를 찾을 수 없습니다."));
        Emoji newEmoji = emojiRepository.findById(emojiReq.getEmojiId())
                .orElseThrow(()-> new CustomException("이모지를 찾을 수 없습니다."));

        user.setEmoji(newEmoji);
        userRepository.save(user);

        return user.getEmoji().getEmojiId();
    }


    public int updateUserPoint(Long userId, int changePoint) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException("유저를 찾을 수 없습니다."));

        int currentUserPoint = user.getPoint();
        user.setPoint(currentUserPoint + changePoint);
        userRepository.save(user);

        return user.getPoint();
    }


}
