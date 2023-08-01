package com.threeracha.gaewoonhae.utils.oauth.request;

import com.threeracha.gaewoonhae.utils.oauth.enums.OAuthProvider;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Getter
@NoArgsConstructor
@ToString
@Schema(description = "카카오 로그인 request 객체")
public class KakaoLoginParams implements OAuthLoginParams {

    @Schema(description = "카카오 인증 코드")
    private String authorizationCode;
    
    @Override
    public OAuthProvider oAuthProvider() {
        return OAuthProvider.KAKAO;
    }

    @Override
    public MultiValueMap<String, String> makeBody() {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("code", authorizationCode);
        return body;
    }
}
