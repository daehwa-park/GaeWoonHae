package com.threeracha.gaewoonhae.api.dto.response;

import com.threeracha.gaewoonhae.db.domain.User;
import com.threeracha.gaewoonhae.utils.oauth.enums.OAuthProvider;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Schema(description = "유저 정보 Response")
@Getter
@Setter
@ToString
public class UserInfoResponse {
    @Schema(description = "사용자 닉네임")
    String nickname;

    @Schema(description = "사용자 포인트")
    int point;

    @Schema(description = "사용자 메인 이모지 ID")
    long emojiId;

    @Schema(description = "사용자 가입 유형")
    OAuthProvider oAuthProvider;

    public UserInfoResponse(User user) {
        this.nickname = user.getNickname();
        this.point = user.getPoint();
        this.emojiId = user.getEmoji().getEmojiId();
        this.oAuthProvider = user.getOAuthProvider();
    }

}
