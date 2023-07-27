package com.threeracha.gaewoonhae.utils.oauth;

import com.threeracha.gaewoonhae.api.dto.response.CommonResponse;
import com.threeracha.gaewoonhae.utils.oauth.request.KakaoLoginParams;
import com.threeracha.gaewoonhae.utils.oauth.request.NaverLoginParams;
import com.threeracha.gaewoonhae.utils.oauth.response.LoginResponse;
import com.threeracha.gaewoonhae.utils.oauth.service.OAuthLoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/oauth")
public class OAuthController {
    private final OAuthLoginService oAuthLoginService;
    private final String SUCCESS = "success";

    @PostMapping("/login/kakao")
    public ResponseEntity<CommonResponse<LoginResponse>> loginKakao(@RequestBody KakaoLoginParams params) {
        return new ResponseEntity<>(
                makeCommonResponse(SUCCESS, oAuthLoginService.login(params)),
                HttpStatus.OK);
    }

    @PostMapping("/login/naver")
    public ResponseEntity<CommonResponse<LoginResponse>> loginNaver(@RequestBody NaverLoginParams params) {
        return new ResponseEntity<>(
                makeCommonResponse(SUCCESS, oAuthLoginService.login(params)),
                HttpStatus.OK);
    }

    @DeleteMapping("/logout/{userId}")
    public ResponseEntity<CommonResponse<Long>> logout(@PathVariable("userId") Long userId) {
        return new ResponseEntity<>(
                makeCommonResponse(SUCCESS, oAuthLoginService.logout(userId)),
                HttpStatus.OK);
    }

    private <T> CommonResponse<T> makeCommonResponse(String message, T data) {
        return CommonResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }
}
