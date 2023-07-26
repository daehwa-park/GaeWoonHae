package com.threeracha.gaewoonhae.utils.oauth.response;

import com.threeracha.gaewoonhae.utils.oauth.enums.OAuthProvider;

public interface OAuthInfoResponse {
    String getEmail();
    String getNickname();
    OAuthProvider getOAuthProvider();
}
