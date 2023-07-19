package com.threeracha.gaewoonhae.api.service.oauth;

import com.threeracha.gaewoonhae.api.request.oauth.OAuthLoginParam;
import com.threeracha.gaewoonhae.api.response.oauth.OAuthInfoResponse;
import com.threeracha.gaewoonhae.enums.OAuthProvider;

public interface OAuthApiClient {
    OAuthProvider oAuthProvider();
    OAuthInfoResponse requestOauthInfo(String accessToken);
}
