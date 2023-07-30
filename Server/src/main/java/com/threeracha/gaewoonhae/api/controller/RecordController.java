package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.api.dto.request.GetExerRecRequest;
import com.threeracha.gaewoonhae.db.dto.FindFitRoomDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "기록 관리 API", description = "사용자 기록 저장, 조회")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/record")
public class RecordController {

    @GetMapping("/{userId}")
    public void getExerciseRecord(GetExerRecRequest getExerRecReq) {

    }
}
