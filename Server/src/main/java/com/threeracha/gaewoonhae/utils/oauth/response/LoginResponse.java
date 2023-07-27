package com.threeracha.gaewoonhae.utils.oauth.response;

import com.threeracha.gaewoonhae.utils.jwt.AuthTokens;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor
public class LoginResponse {

    AuthTokens tokens;
    Long userId;
}
