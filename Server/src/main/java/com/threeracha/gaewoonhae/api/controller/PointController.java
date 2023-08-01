package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.api.dto.response.CommonResponse;
import com.threeracha.gaewoonhae.api.service.EmojiService;
import com.threeracha.gaewoonhae.api.service.PointHistoryService;
import com.threeracha.gaewoonhae.db.domain.PointHistory;
import com.threeracha.gaewoonhae.db.dto.FindFitRoomDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "포인트 관리 API", description = "포인트 기록 조회, 포인트 추가 및 차감")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/point")
public class PointController {
    static final String SUCCESS = "success";

    final PointHistoryService pointHistoryService;
    //포인트 히스토리 조회
    @GetMapping("/history/{userId}")
    public ResponseEntity<CommonResponse<List<PointHistory>>> getPointHistory(@PathVariable("userId") Long userId) {
        List<PointHistory> PointList = pointHistoryService.getPointHistoryList(userId);
        return new ResponseEntity<>(makeCommonResponse(SUCCESS, PointList), HttpStatus.OK);
    }

    private <T> CommonResponse<T> makeCommonResponse(String message, T data) {
        return CommonResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }

}
