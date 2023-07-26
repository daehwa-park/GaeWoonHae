package com.threeracha.gaewoonhae.utils.oauth;

import com.threeracha.gaewoonhae.api.dto.response.CommonResponse;
import com.threeracha.gaewoonhae.utils.oauth.request.KakaoLoginParams;
import com.threeracha.gaewoonhae.utils.oauth.request.NaverLoginParams;
import com.threeracha.gaewoonhae.utils.oauth.service.OAuthLoginService;
import com.threeracha.gaewoonhae.utils.jwt.AuthTokens;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/oauth")
public class OAuthController {
    private final OAuthLoginService oAuthLoginService;
    private final String SUCCESS = "success";

    @PostMapping("/login/kakao")
    public ResponseEntity<CommonResponse<AuthTokens>> loginKakao(@RequestBody KakaoLoginParams params) {
        System.out.println(params);
        AuthTokens authToken = oAuthLoginService.login(params);
        return new ResponseEntity<>(makeCommonResponse(SUCCESS, authToken), HttpStatus.OK);
    }

    @PostMapping("/login/naver")
    public ResponseEntity<CommonResponse<AuthTokens>> loginNaver(@RequestBody NaverLoginParams params) {
        AuthTokens authToken = oAuthLoginService.login(params);
        return new ResponseEntity<>(makeCommonResponse(SUCCESS, authToken), HttpStatus.OK);
    }

//    @PostMapping("/guest")
//    public ResponseEntity<CommonResponse<AuthTokens>> loginGuest(@RequestBody GuestLoginParam params) {
//
//        return new ResponseEntity<>(makeCommonResponse(SUCCESS, ), HttpStatus.OK);
//    }

    private <T> CommonResponse<T> makeCommonResponse(String message, T data) {
        return CommonResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }
}
