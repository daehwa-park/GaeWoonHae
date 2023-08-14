package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.api.dto.response.CommonResponse;
import com.threeracha.gaewoonhae.exception.ExceptionResponse;
import com.threeracha.gaewoonhae.utils.oauth.request.KakaoLoginParams;
import com.threeracha.gaewoonhae.utils.oauth.request.NaverLoginParams;
import com.threeracha.gaewoonhae.utils.oauth.request.RegenTokenReq;
import com.threeracha.gaewoonhae.utils.oauth.response.LoginResponse;
import com.threeracha.gaewoonhae.utils.oauth.service.OAuthLoginService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "소셜 로그인 API", description = "소셜 로그인, 로그아웃")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/oauth")
public class OauthController {
    private final OAuthLoginService oAuthLoginService;
    private final String SUCCESS = "success";

    @Operation(summary = "카카오 로그인", description = "authrization 코드를 받아 카카오 로그인을 한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = LoginResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = ExceptionResponse.class)))
    })
    @Parameter(name = "userId", description = "조회할 사용자의 userId")
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

    @Operation(summary = "로그아웃", description = "회원 탈퇴를 한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = LoginResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = ExceptionResponse.class)))
    })
    @Parameter(name = "userId", description = "탈퇴할 사용자의 userId")
    @DeleteMapping("/logout/{userId}")
    public ResponseEntity<CommonResponse<Long>> logout(@PathVariable("userId") Long userId) {
        return new ResponseEntity<>(
                makeCommonResponse(SUCCESS, oAuthLoginService.logout(userId)),
                HttpStatus.OK);
    }

    @Operation(summary = "refresh 토큰 재발급", description = "userId와 refresh 토큰을 입력받아 access 토큰과 refresh 토큰을 재발급한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = LoginResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = ExceptionResponse.class)))
    })
    @PostMapping("/regen")
    public ResponseEntity<CommonResponse<LoginResponse>> regenerateTokens(@RequestBody RegenTokenReq regenTokenReq) {
        return new ResponseEntity<>(makeCommonResponse(SUCCESS, oAuthLoginService.regenToken(regenTokenReq)), HttpStatus.OK);
    }

    private <T> CommonResponse<T> makeCommonResponse(String message, T data) {
        return CommonResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }
}
