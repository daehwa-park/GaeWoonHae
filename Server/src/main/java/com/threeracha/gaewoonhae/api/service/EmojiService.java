package com.threeracha.gaewoonhae.api.service;

import com.threeracha.gaewoonhae.api.dto.request.NicknameRequest;
import com.threeracha.gaewoonhae.api.dto.response.EmojiResponse;
import com.threeracha.gaewoonhae.db.domain.User;
import com.threeracha.gaewoonhae.db.dto.MakeNewRoomDto;
import com.threeracha.gaewoonhae.db.repository.EmojiRepository;
import com.threeracha.gaewoonhae.db.repository.UserRepository;
import com.threeracha.gaewoonhae.exception.CustomException;
import com.threeracha.gaewoonhae.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EmojiService {
    private final EmojiRepository emojiRepository;
    private final UserRepository userRepository;

//    @Transactional
//    public EmojiResponse getEmojiId() {
//        return
//    }

    //메인 이모지 변경
    public String changeMainEmoji(NicknameRequest nicknameReq) {
        User user = userRepository.findByUserId(nicknameReq.getUserId())
                .orElseThrow(()-> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR));

        user.setNickname(nicknameReq.getNickname());
        userRepository.save(user);

        return user.getNickname();
    }
}
