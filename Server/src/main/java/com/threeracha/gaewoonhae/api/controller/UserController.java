package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.api.dto.response.CommonResponse;
import com.threeracha.gaewoonhae.api.dto.response.UserResponse;
import com.threeracha.gaewoonhae.api.service.UserService;
import com.threeracha.gaewoonhae.db.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    final UserService userService;
    static final String SUCCESS = "success";

    @PostMapping("/myPage")
    public ResponseEntity<CommonResponse<UserResponse>> userInfo (@RequestBody Integer userId) {

        User user = userService.getUserInfo(userId);
        UserResponse userResponse = UserResponse.builder()
                .nickname(user.getNickname())
                .emojiId(user.getEmojiId())
                .oAuthProvider(user.getOAuthProvider())
                .point(user.getPoint())
                .build();
        return new ResponseEntity<>(makeCommonResponse(SUCCESS, userResponse), HttpStatus.OK);
    }

    private <T> CommonResponse<T> makeCommonResponse(String message, T data) {
        return CommonResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }

}
