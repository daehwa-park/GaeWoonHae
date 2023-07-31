package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.api.dto.response.CommonResponse;
import com.threeracha.gaewoonhae.api.dto.response.EmojiResponse;
import com.threeracha.gaewoonhae.api.service.EmojiService;
import com.threeracha.gaewoonhae.api.service.UserBuyService;
import com.threeracha.gaewoonhae.api.service.UserService;
import com.threeracha.gaewoonhae.db.domain.Emoji;
import com.threeracha.gaewoonhae.db.dto.FindFitRoomDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "이모지 관리 API", description = "이모지 구입, 선택, 목록 조회")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/emoji")
public class EmojiController {
    static final String SUCCESS = "success";
    EmojiService emojiService;
    UserService userService;
    UserBuyService userBuyService;

    //전체 이모지 목록 조회
//    @GetMapping("/store")
//    public ResponseEntity<CommonResponse<EmojiResponse>> getEmojiList() {
//    }

    //구입 기능
    @PostMapping("/store/buy")
    public void buyEmoji(FindFitRoomDto findFitRoomDto) {
    }

    //구입한 이모지 조회 기능
    @GetMapping("/store/buy/{userId}")
    public ResponseEntity<CommonResponse<List<Integer>>> getBuyEmojiList(@PathVariable("userId") Long userId){
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
