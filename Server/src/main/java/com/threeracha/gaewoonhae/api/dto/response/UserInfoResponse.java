package com.threeracha.gaewoonhae.api.dto.response;

import com.threeracha.gaewoonhae.db.domain.User;
import com.threeracha.gaewoonhae.utils.oauth.enums.OAuthProvider;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoResponse {
    String nickname;
    int point;
    long emojiId;
    OAuthProvider oAuthProvider;

    public UserInfoResponse(User user) {
        this.nickname = user.getNickname();
        this.point = user.getPoint();
        this.emojiId = user.getEmoji().getEmojiId();
        this.oAuthProvider = user.getOAuthProvider();
    }

}
