package com.threeracha.gaewoonhae.utils.oauth.service;

import com.threeracha.gaewoonhae.api.response.LoginResponse;
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
        OAuthInfoResponse oAuthInfoResponse = requestOAuthInfoService.request(params);
        User user = findOrCreateUser(oAuthInfoResponse);
        AuthTokens tokens = authTokensGenerator.generate(user.getUserId());
        return LoginResponse.builder().tokens(tokens).nickname(user.getNickname())
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