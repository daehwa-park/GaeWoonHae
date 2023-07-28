package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.api.dto.request.NicknameRequest;
import com.threeracha.gaewoonhae.api.dto.response.CommonResponse;
import com.threeracha.gaewoonhae.api.dto.response.UserInfoResponse;
import com.threeracha.gaewoonhae.api.service.UserService;
import com.threeracha.gaewoonhae.db.domain.User;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "사용자관리 API", description = "사용자 로그인, 회원가입 ")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    static final String SUCCESS = "success";

    @GetMapping("/userinfo/{userId}")
    public ResponseEntity<CommonResponse<UserInfoResponse>> userInfo (@PathVariable("userId") Long userId) {

        User userInfo = userService.getUserInfo(userId);

        return new ResponseEntity<>(
                makeCommonResponse(SUCCESS, new UserInfoResponse(userInfo)), HttpStatus.OK);
    }

    @PutMapping("/nickname")
    public ResponseEntity<CommonResponse<String>> changeNickname (@RequestBody NicknameRequest nicknameReq) {

        return new ResponseEntity<>(makeCommonResponse(SUCCESS, userService.changeNickname(nicknameReq)), HttpStatus.OK);
    }

    private <T> CommonResponse<T> makeCommonResponse(String message, T data) {
        return CommonResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }

}
