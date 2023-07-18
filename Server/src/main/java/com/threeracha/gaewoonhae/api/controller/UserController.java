package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.api.dto.KakaoTokenDTO;
import com.threeracha.gaewoonhae.api.dto.UserDTO;
import com.threeracha.gaewoonhae.api.service.UserService;
import com.threeracha.gaewoonhae.db.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(KakaoTokenDTO token) {


        User userInfo = userService.getUserInfo(token);

    }

}
