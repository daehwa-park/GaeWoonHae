package com.threeracha.gaewoonhae.api.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "포인트 관리 API", description = "포인트 기록 조회, 포인트 추가 및 차감")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/point")
public class PointController {

    @GetMapping("/history/{userId}")
    public void getPointHistory( ) {
    }

}
