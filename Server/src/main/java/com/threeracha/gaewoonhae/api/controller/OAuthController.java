package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.api.request.oauth.KakaoLoginParams;
import com.threeracha.gaewoonhae.api.request.oauth.NaverLoginParams;
import com.threeracha.gaewoonhae.api.response.CommonResponse;
import com.threeracha.gaewoonhae.api.response.oauth.OAuthInfoResponse;
import com.threeracha.gaewoonhae.api.service.OAuthLoginService;
import com.threeracha.gaewoonhae.utils.jwt.AuthTokens;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class OAuthController {
    private final OAuthLoginService oAuthLoginService;

    @PostMapping("/kakao")
    public ResponseEntity<AuthTokens> loginKakao(@RequestBody KakaoLoginParams params) {
        System.out.println(params);
        return ResponseEntity.ok(oAuthLoginService.login(params));
    }

    @PostMapping("/naver")
    public ResponseEntity<AuthTokens> loginNaver(@RequestBody NaverLoginParams params) {
        return ResponseEntity.ok(oAuthLoginService.login(params));
    }
}
