package com.threeracha.gaewoonhae.utils.oauth.response;

import com.threeracha.gaewoonhae.utils.jwt.AuthTokens;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Schema(description = "로그인 Response")
@Getter
@AllArgsConstructor
public class LoginResponse {

    @Schema(description = "accessToken과 RefreshToken을 담은 객체")
    AuthTokens tokens;
    @Schema(description = "로그인 한 유저 ID")
    Long userId;
}
