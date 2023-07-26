package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.api.dto.request.NicknameRequest;
import com.threeracha.gaewoonhae.api.dto.request.UserInfoRequest;
import com.threeracha.gaewoonhae.api.dto.response.NicknameResponse;
import com.threeracha.gaewoonhae.api.dto.response.CommonResponse;
import com.threeracha.gaewoonhae.api.dto.response.UserInfoResponse;
import com.threeracha.gaewoonhae.api.service.UserService;
import com.threeracha.gaewoonhae.db.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    final UserService userService;
    static final String SUCCESS = "success";

    @PostMapping("/userinfo")
    public ResponseEntity<CommonResponse<UserInfoResponse>> userInfo (@RequestBody UserInfoRequest userInfoRequest) {

        User userInfo = userService.getUserInfo(userInfoRequest.getUserId());

        return new ResponseEntity<>(
                makeCommonResponse(SUCCESS, new UserInfoResponse(userInfo)), HttpStatus.OK);
    }

    @PostMapping("/change-nickname")
    public ResponseEntity<CommonResponse<NicknameResponse>> changeNickname (@RequestBody NicknameRequest nicknameRequest) {
        return null;
    }

    private <T> CommonResponse<T> makeCommonResponse(String message, T data) {
        return CommonResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }

}
