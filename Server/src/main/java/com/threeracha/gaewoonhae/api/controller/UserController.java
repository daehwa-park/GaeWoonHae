package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.api.service.UserService;
import com.threeracha.gaewoonhae.db.dto.MakeNewRoomDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Tag(name = "사용자관리 API", description = "사용자 로그인, 회원가입 ")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    final UserService userService;
    @PostMapping("/login/{type}")
    public void userLoginByType(MakeNewRoomDto makeNewRoomDto, @PathVariable String type) {
    }

    @GetMapping("/logout")
    public void userLogout(MakeNewRoomDto makeNewRoomDto) {
    }

}
