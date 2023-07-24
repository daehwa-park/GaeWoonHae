package com.threeracha.gaewoonhae.utils.oauth.request;

import com.threeracha.gaewoonhae.utils.oauth.enums.OAuthProvider;
import org.springframework.util.MultiValueMap;

public interface OAuthLoginParams {
    OAuthProvider oAuthProvider();
    MultiValueMap<String, String> makeBody();
}
