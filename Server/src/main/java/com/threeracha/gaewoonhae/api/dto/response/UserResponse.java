package com.threeracha.gaewoonhae.api.dto.response;

import com.threeracha.gaewoonhae.utils.oauth.enums.OAuthProvider;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserResponse {
    String nickname;
    int point;
    int emojiId;
    OAuthProvider oAuthProvider;

}
