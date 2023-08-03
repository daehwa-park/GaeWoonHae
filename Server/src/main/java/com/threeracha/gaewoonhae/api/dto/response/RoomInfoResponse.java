package com.threeracha.gaewoonhae.api.dto.response;

import com.threeracha.gaewoonhae.db.domain.GameType;
import com.threeracha.gaewoonhae.db.domain.Room;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Schema(description = "방 정보 Response")
@Getter
@Setter
public class RoomInfoResponse {
    @Schema(description = "세션 아이디")
    String sessionId;

    @Schema(description = "방장 닉네임")
    String hostName;

    @Schema(description = "게임 종류")
    int gameType;

    public RoomInfoResponse(Room room) {
        this.sessionId = room.getSessionId();
        this.hostName = room.getUser().getNickname();
        this.gameType = room.getGameType().getGameType();
    }
}
