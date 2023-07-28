package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.api.dto.response.CommonResponse;
import com.threeracha.gaewoonhae.db.dto.FindFitRoomDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "마이페이지 API", description = "운동기록 조회, 포인트 이력 조회, 이모지 조회, 구입, 선택  ")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/mypage")
public class MypageController {

    @GetMapping("/emogi/store")
    public void getEmojiList(FindFitRoomDto findFitRoomDto) {
    }

    @PostMapping("/emogi/store/buy")
    public void buyEmoji(FindFitRoomDto findFitRoomDto) {
    }

    @PostMapping("/emogi/choice")
    public void choiceMainEmoji(FindFitRoomDto findFitRoomDto) {
    }

    @GetMapping("/record")
    public void getExerciseRecord(FindFitRoomDto findFitRoomDto) {
    }

    @GetMapping("/history")
    public void getPointHistory(FindFitRoomDto findFitRoomDto) {
    }
}
