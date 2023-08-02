package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.api.dto.request.BuyEmojiRequest;
import com.threeracha.gaewoonhae.api.dto.response.*;
import com.threeracha.gaewoonhae.api.service.EmojiService;
import com.threeracha.gaewoonhae.api.service.PointHistoryService;
import com.threeracha.gaewoonhae.api.service.UserBuyService;
import com.threeracha.gaewoonhae.api.service.UserService;
import com.threeracha.gaewoonhae.db.domain.Emoji;
import com.threeracha.gaewoonhae.db.domain.UserBuyEmoji;
import com.threeracha.gaewoonhae.exception.ExceptionResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "이모지 관리 API", description = "이모지 구입, 선택, 목록 조회")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/emoji")
//@Transactional(readOnly = true)
public class EmojiController {
    static final String SUCCESS = "success";
    final EmojiService emojiService;
    final UserService userService;
    final UserBuyService userBuyService;
    final PointHistoryService pointHistoryService;

    //전체 이모지 목록 조회
    @Operation(summary = "전체 이모지 목록 조회", description = "전체 이모지 목록을 조회함.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = EmojiResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = ExceptionResponse.class)))
    })
    @GetMapping("/store")
    public ResponseEntity<CommonResponse<List<EmojiResponse>>> getEmojiList() {
            List<EmojiResponse> emojiList = emojiService.getEmojiList();
            return new ResponseEntity<>(makeCommonResponse(SUCCESS,emojiList), HttpStatus.OK);
        }

    //구입하기
    @Operation(summary = "이모지 구입", description = "emoji req를 전달하여 이모지를 구입하고 "+
            " 구입 후 남은 포인트와 해당 이모지 번호를 반환한다. ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = BuyEmojiResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = ExceptionResponse.class)))
    })
    @PostMapping("/store/buy")
    public ResponseEntity<CommonResponse<BuyEmojiResponse>> buyEmoji(@RequestBody BuyEmojiRequest buyEmojiReq){
        //이모지 id를 받음
        UserBuyEmoji userBuyEmoji = emojiService.addEmoji(buyEmojiReq.getUserId(), buyEmojiReq.getEmojiId());
        Emoji emoji = userBuyEmoji.getEmoji();

        //현재 내포인트 감소
        int changedPoint = userService.updateUserPoint(buyEmojiReq.getUserId(),emoji.getEmojiPrice() *(-1));
        //포인트 히스토리에 추가
        pointHistoryService.addPointHistory(buyEmojiReq.getUserId(), emoji.getEmojiPrice() *(-1));

        BuyEmojiResponse response = new BuyEmojiResponse();
        response.setEmojiId(emoji.getEmojiId());
        response.setPoint(changedPoint);
        //리턴
        return new ResponseEntity<>(makeCommonResponse(SUCCESS,response), HttpStatus.OK);
    }

    //구입한 이모지 조회 기능
    @Operation(summary = "내 이모지 조회", description = "user_id가 구입한 이모지의 아이디와 가격을 리턴.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = EmojiResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = ExceptionResponse.class)))
    })
    @GetMapping("/store/buy/{userId}")
    public ResponseEntity<CommonResponse<List<EmojiResponse>>> getBuyEmojiLst(@PathVariable("userId") Long userId){
        List<EmojiResponse> buyEmojiList = userBuyService.getList(userId);
        return new ResponseEntity<>(makeCommonResponse(SUCCESS,buyEmojiList), HttpStatus.OK);
    }

    //메인 이모지 바꾸기 기능
    @Operation(summary = "내 이모지 변경", description = "user의 기본 이모지를 변경하고"+"이모지 아이디를 리턴.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = Long.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = ExceptionResponse.class)))
    })
    @Transactional
    @PostMapping("/change")
    public ResponseEntity<CommonResponse<Long>> changeMainEmoji(@RequestBody BuyEmojiRequest emojiReq) {
        return new ResponseEntity<>(makeCommonResponse(SUCCESS, userService.changeEmoji(emojiReq)), HttpStatus.CREATED);
    }

    private <T> CommonResponse<T> makeCommonResponse(String message, T data) {
        return CommonResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }
}
