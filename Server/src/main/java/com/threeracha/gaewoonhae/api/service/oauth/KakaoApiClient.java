package com.threeracha.gaewoonhae.api.service.oauth;

import com.threeracha.gaewoonhae.api.request.oauth.OAuthLoginParam;
import com.threeracha.gaewoonhae.api.response.oauth.KakaoInfoResponse;
import com.threeracha.gaewoonhae.api.response.oauth.OAuthInfoResponse;
import com.threeracha.gaewoonhae.enums.OAuthProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class KakaoApiClient implements OAuthApiClient{

    private final RestTemplate restTemplate;

    private static final String GRANT_TYPE = "authorization_code";

    @Value("${oauth.kakao.url.api}")
    private String apiUrl;


    @Override
    public OAuthProvider oAuthProvider() {
        return OAuthProvider.KAKAO;
    }


    @Override
    public OAuthInfoResponse requestOauthInfo(String accessToken) {
        String url = apiUrl + "/v2/user/me";

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        httpHeaders.set("Authorization", "Bearer " + accessToken);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("property_keys", "[\"kakao_account.email\", \"kakao_account.profile\"]");

        HttpEntity<?> request = new HttpEntity<>(body, httpHeaders);

        return restTemplate.postForObject(url, request, KakaoInfoResponse.class);
    }
}
