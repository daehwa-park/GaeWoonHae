package com.threeracha.gaewoonhae.api.request.oauth;

import com.threeracha.gaewoonhae.enums.OAuthProvider;
import org.springframework.util.MultiValueMap;

public interface OAuthLoginParams {
    OAuthProvider oAuthProvider();
    MultiValueMap<String, String> makeBody();
}
