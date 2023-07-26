package com.threeracha.gaewoonhae.utils.oauth.service;

import com.threeracha.gaewoonhae.utils.oauth.request.OAuthLoginParams;
import com.threeracha.gaewoonhae.utils.oauth.response.OAuthInfoResponse;
import com.threeracha.gaewoonhae.utils.oauth.enums.OAuthProvider;

public interface OAuthApiClient {
    OAuthProvider oAuthProvider();
    String requestAccessToken(OAuthLoginParams params);
    OAuthInfoResponse requestOauthInfo(String accessToken);
}
