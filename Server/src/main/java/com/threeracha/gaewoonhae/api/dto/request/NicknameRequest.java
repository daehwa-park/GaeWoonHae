package com.threeracha.gaewoonhae.api.dto.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class NicknameRequest {

    Long userId;
    String nickname;

}
