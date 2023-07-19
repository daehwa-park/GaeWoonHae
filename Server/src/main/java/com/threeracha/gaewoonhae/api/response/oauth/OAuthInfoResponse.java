package com.threeracha.gaewoonhae.api.response.oauth;

import com.threeracha.gaewoonhae.enums.OAuthProvider;

public interface OAuthInfoResponse {
    String getEmail();
    String getNickname();
    OAuthProvider getOAuthProvider();
}
