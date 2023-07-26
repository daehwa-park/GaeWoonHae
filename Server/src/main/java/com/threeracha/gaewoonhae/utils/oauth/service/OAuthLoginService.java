package com.threeracha.gaewoonhae.utils.oauth.service;

import com.threeracha.gaewoonhae.utils.oauth.request.OAuthLoginParams;
import com.threeracha.gaewoonhae.utils.oauth.response.OAuthInfoResponse;
import com.threeracha.gaewoonhae.db.domain.User;
import com.threeracha.gaewoonhae.db.repository.UserRepository;
import com.threeracha.gaewoonhae.utils.jwt.AuthTokens;
import com.threeracha.gaewoonhae.utils.jwt.AuthTokensGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OAuthLoginService {
    private final UserRepository userRepository;
    private final AuthTokensGenerator authTokensGenerator;
    private final RequestOAuthInfoService requestOAuthInfoService;

    public AuthTokens login(OAuthLoginParams params) {
        // API 서버로부터 유저 정보를 받아옴
        OAuthInfoResponse oAuthInfoResponse = requestOAuthInfoService.request(params);
        
        // 유저 정보를 바탕으로 신규 유저는 회원가입을, 기존 유저는 로그인을 실행
        User user = findOrCreateUser(oAuthInfoResponse);
        
        // 로그인 한 유저 ID를 바탕으로 accessToken과 refreshToken 생성
        AuthTokens token = authTokensGenerator.generate(user.getUserId());

        // user 테이블에 refreshToken 저장
        user.setRefreshToken(token.getRefreshToken());
        userRepository.flush();

        return token;
    }

    private User findOrCreateUser(OAuthInfoResponse oAuthInfoResponse) {
        return userRepository.findByEmail(oAuthInfoResponse.getEmail())
                .orElseGet(() -> newUser(oAuthInfoResponse));
    }

    private User newUser(OAuthInfoResponse oAuthInfoResponse) {
        User user = User.builder()
                .email(oAuthInfoResponse.getEmail())
                .nickname(oAuthInfoResponse.getNickname())
                .oAuthProvider(oAuthInfoResponse.getOAuthProvider())
                .build();

        return userRepository.save(user);
    }
}