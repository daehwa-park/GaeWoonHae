package com.threeracha.gaewoonhae.api.service;

import com.threeracha.gaewoonhae.api.dto.response.EmojiResponse;
import com.threeracha.gaewoonhae.db.domain.Emoji;
import com.threeracha.gaewoonhae.db.domain.User;
import com.threeracha.gaewoonhae.db.domain.UserBuyEmoji;
import com.threeracha.gaewoonhae.db.repository.EmojiRepository;
import com.threeracha.gaewoonhae.db.repository.UserBuyRepository;
import com.threeracha.gaewoonhae.db.repository.UserRepository;
import com.threeracha.gaewoonhae.exception.CustomException;
import com.threeracha.gaewoonhae.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class EmojiService {
    private final EmojiRepository emojiRepository;
    private final UserRepository userRepository;
    private final UserBuyRepository userBuyRepository;

    public List<EmojiResponse> getEmojiList() {
        return emojiRepository.findAll()
                .stream()
                .map(EmojiResponse::new) // .map((emoji) -> new EmojiResponse(emoji))
                .collect(Collectors.toList());
    }

//    @Transactional
//    public Optional<Emoji> getEmojiId(long emojiId) {
//        return emojiRepository.findById(emojiId);
//    }

//    public Long addEmoji(User user, Emoji emoji) {
////        User user = userRepository.findById(userId)
////                    .orElseThrow(()-> new CustomException("멤버를 찾을 수 없습니다."));
//
//        UserBuyEmoji userBuyEmoji = UserBuyEmoji.addEmoji(user, emoji);
//        UserBuyEmoji savedUserEmoji =  emojiRepository.save(userBuyEmoji);
//
//       return savedUserEmoji.getEmojiEmojiId();
//    }
    @Transactional(readOnly=false)
    public UserBuyEmoji addEmoji(long userId, long emojiId) {

        User user = userRepository.findById(userId)
                    .orElseThrow(()-> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));
        Emoji emoji = emojiRepository.findById(emojiId)
                    .orElseThrow(()-> new CustomException(CustomExceptionList.EMOJI_NOT_FOUND_ERROR));

        UserBuyEmoji userBuyEmoji = new UserBuyEmoji();

        userBuyEmoji.setUser(user);
        userBuyEmoji.setEmoji(emoji);

        userBuyRepository.save(userBuyEmoji);

        return userBuyEmoji;
    }


    //메인 이모지 변경
//    public String changeMainEmoji(NicknameRequest nicknameReq) {
//        User user = userRepository.findByUserId(nicknameReq.getUserId())
//                .orElseThrow(()-> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR));
//
//        user.setNickname(nicknameReq.getNickname());
//        userRepository.save(user);
//
//        return user.getNickname();
//    }
}
