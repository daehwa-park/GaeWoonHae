package com.threeracha.gaewoonhae.utils.oauth.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegenTokenReq {

    Long userId;
    String refreshToken;

}