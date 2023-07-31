package com.threeracha.gaewoonhae.api.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "이모지 관리 API", description = "이모지 구입, 선택, 목록 조회")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/emoji")
public class EmojiController {

    @GetMapping("/store")
    public void getEmojiList() {
    }

    @PostMapping("/store/buy")
    public void buyEmoji() {
    }

    @PostMapping("/choice")
    public void choiceMainEmoji() {
    }

}
