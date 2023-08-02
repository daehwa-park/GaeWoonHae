package com.threeracha.gaewoonhae.utils.oauth.request;

import com.threeracha.gaewoonhae.utils.oauth.enums.OAuthProvider;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Schema(description = "네이버 로그인 Request 객체")
@Getter
@NoArgsConstructor
public class NaverLoginParams implements OAuthLoginParams {

    @Schema(description = "네이버 로그인 인증 코드")
    private String authorizationCode;
    @Schema(description = "상태")
    private String state;

    @Override
    public OAuthProvider oAuthProvider() {
        return OAuthProvider.NAVER;
    }

    @Override
    public MultiValueMap<String, String> makeBody() {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("code", authorizationCode);
        body.add("state", state);
        return body;
    }
}