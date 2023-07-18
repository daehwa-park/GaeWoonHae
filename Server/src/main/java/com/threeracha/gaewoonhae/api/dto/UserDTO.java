package com.threeracha.gaewoonhae.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO {
    String nickname;
    String accessToken;
    String refreshToken;
}
