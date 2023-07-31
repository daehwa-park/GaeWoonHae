package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.api.dto.response.CommonResponse;
import com.threeracha.gaewoonhae.api.dto.response.RecordResponse;
import com.threeracha.gaewoonhae.api.service.RecordService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "기록 관리 API", description = "사용자 기록 저장, 조회")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/record")
public class RecordController {

    final RecordService recordService;
    final String SUCCESS = "success";

    @GetMapping("/{userId}")
    public ResponseEntity<CommonResponse<List<RecordResponse>>> getExerciseRecord(@PathVariable("userId") Long userId) {

        return new ResponseEntity<>(makeCommonResponse(SUCCESS, recordService.getAllRecord(userId)), HttpStatus.OK);
    }

    private <T> CommonResponse<T> makeCommonResponse(String message, T data) {
        return CommonResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }

}
