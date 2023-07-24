package com.threeracha.gaewoonhae.api.response;

import com.threeracha.gaewoonhae.utils.jwt.AuthTokens;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class LoginResponse {
    AuthTokens tokens;
    String nickname;

}
