package com.threeracha.gaewoonhae.api.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Schema(description = "사용자 회원 탈퇴 Request")
@Getter
public class ResignUserRequest {

    @Schema(description = "사용자 아이디")
    Long userId;
    
    @Schema(description = "검증용 요구 입력 닉네임")
    String nickname;
    
    @Schema(description = "리프레쉬 토큰")
    String refreshToken;
}
