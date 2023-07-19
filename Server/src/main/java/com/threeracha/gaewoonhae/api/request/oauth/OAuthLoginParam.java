package com.threeracha.gaewoonhae.api.request.oauth;

import com.threeracha.gaewoonhae.enums.OAuthProvider;
import org.springframework.util.MultiValueMap;

public interface OAuthLoginParam {
    OAuthProvider oAuthProvider();
    MultiValueMap<String, String> makeBody();
}
