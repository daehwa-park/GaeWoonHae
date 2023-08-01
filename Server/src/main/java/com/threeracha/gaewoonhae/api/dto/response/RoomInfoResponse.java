package com.threeracha.gaewoonhae.api.dto.response;

import com.threeracha.gaewoonhae.db.domain.User;
import com.threeracha.gaewoonhae.utils.oauth.enums.OAuthProvider;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Schema(description = "방 정보 Response")
@Getter
@Setter
@AllArgsConstructor
public class RoomInfoResponse {
    @Schema(description = "세션 아이디")
    String sessionId;

    @Schema(description = "방장 닉네임")
    String hostName;

}
