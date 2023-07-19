package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.api.response.CommonResponse;
import com.threeracha.gaewoonhae.api.response.oauth.OAuthInfoResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/oauth")
public class OAuthContorller {


    public ResponseEntity<CommonResponse<OAuthInfoResponse>> getOauthUserInfo() {

    }


}
