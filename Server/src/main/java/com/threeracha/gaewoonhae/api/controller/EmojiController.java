package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.api.dto.request.BuyEmojiRequest;
import com.threeracha.gaewoonhae.api.dto.response.CommonResponse;
import com.threeracha.gaewoonhae.api.dto.response.EmojiResponse;
import com.threeracha.gaewoonhae.api.dto.response.UserBuyEmojiResponse;
import com.threeracha.gaewoonhae.api.dto.response.UserInfoResponse;
import com.threeracha.gaewoonhae.api.service.EmojiService;
import com.threeracha.gaewoonhae.api.service.UserBuyService;
import com.threeracha.gaewoonhae.api.service.UserService;
import com.threeracha.gaewoonhae.db.domain.Emoji;
import com.threeracha.gaewoonhae.db.domain.UserBuyEmoji;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Tag(name = "이모지 관리 API", description = "이모지 구입, 선택, 목록 조회")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/emoji")
public class EmojiController {
    static final String SUCCESS = "success";
    final EmojiService emojiService;
    final UserService userService;
    final UserBuyService userBuyService;

    //전체 이모지 목록 조회
    @GetMapping("/store")
    public ResponseEntity<CommonResponse<List<Emoji>>> getEmojiList() {
            List<Emoji> emojiList = emojiService.getEmojiList();
            return new ResponseEntity<>(makeCommonResponse(SUCCESS,emojiList), HttpStatus.OK);
        }

    //구입하기
    @PostMapping("/store/buy")
    public ResponseEntity<CommonResponse<UserBuyEmoji>> buyEmoji(@RequestBody BuyEmojiRequest buyEmojiReq){
        //이모지 id를 받음
        UserBuyEmoji buyedEmojiId = emojiService.addEmoji(buyEmojiReq.getUserId(), buyEmojiReq.getEmojiId());
        return new ResponseEntity<>(makeCommonResponse(SUCCESS,buyedEmojiId), HttpStatus.CREATED);
    }

    //구입한 이모지 조회 기능
    @GetMapping("/store/buy/{userId}")
    public ResponseEntity<CommonResponse<List<Emoji>>> getBuyEmojiLst(@PathVariable("userId") Long userId){
        List<Emoji> buyEmojiList = userBuyService.getList(userId);
        return new ResponseEntity<>(makeCommonResponse(SUCCESS,buyEmojiList), HttpStatus.OK);
    }

    //메인 이모지 바꾸기 기능 -> ???
//    @PostMapping("/choice/{userId}")
//    public ResponseEntity<CommonResponse<String>> choiceMainEmoji(@RequestBody EmojiResponse emojiResponse) {
//        String choicedEmoji = emojiService.setEmojiId(emojiResponse.getUserId(), emojiResponse.getEmojiId());
//        return new ResponseEntity<>(makeCommonResponse(SUCCESS,choicedEmoji), HttpStatus.CREATED);
//
//    }
    private <T> CommonResponse<T> makeCommonResponse(String message, T data) {
        return CommonResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }
}
