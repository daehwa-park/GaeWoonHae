package com.threeracha.gaewoonhae.api.dto.response;

import lombok.Getter;

@Getter
public class NicknameResponse {
    String nickname;

    public NicknameResponse(String nickname) {
        this.nickname = nickname;
    }
}
