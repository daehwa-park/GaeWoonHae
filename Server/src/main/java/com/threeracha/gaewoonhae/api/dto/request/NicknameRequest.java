package com.threeracha.gaewoonhae.api.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Schema(description = "닉네임 변경 리퀘스트 DTO")
public class NicknameRequest {

    @Schema(description = "유저 ID")
    Long userId;
    @Schema(description = "변경할 닉네임")
    String nickname;

}
