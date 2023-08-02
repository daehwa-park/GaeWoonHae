package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.api.dto.response.CommonResponse;
import com.threeracha.gaewoonhae.api.dto.response.EmojiResponse;
import com.threeracha.gaewoonhae.api.dto.response.PointHistoryResponse;
import com.threeracha.gaewoonhae.api.service.PointHistoryService;
import com.threeracha.gaewoonhae.db.domain.PointHistory;
import com.threeracha.gaewoonhae.exception.ExceptionResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
    @Operation(summary = "포인트 히스토리 조회", description = "사용자의 포인트 히스토리 목록을 조회하고 포인트와 추가된 날짜를 리턴.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = PointHistoryResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = ExceptionResponse.class)))
    })
    @GetMapping("/history/{userId}")
    public ResponseEntity<CommonResponse<List<PointHistoryResponse>>> getPointHistory(@PathVariable("userId") Long userId) {
        List<PointHistoryResponse> pointList = pointHistoryService.getPointHistoryList(userId);
        return new ResponseEntity<>(makeCommonResponse(SUCCESS, pointList), HttpStatus.OK);
    }

    private <T> CommonResponse<T> makeCommonResponse(String message, T data) {
        return CommonResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }

}
