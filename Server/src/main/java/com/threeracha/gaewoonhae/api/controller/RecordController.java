package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.api.dto.request.RecordDateRequest;
import com.threeracha.gaewoonhae.api.dto.response.CommonResponse;
import com.threeracha.gaewoonhae.api.dto.response.RecordResponse;
import com.threeracha.gaewoonhae.api.service.RecordService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "기록 관리 API", description = "사용자 기록 조회")
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

    @GetMapping("/{gameTypeId}/{userId}")
    public ResponseEntity<CommonResponse<List<RecordResponse>>> getExerciseRecordByGameType(
            @PathVariable("userId") Long userId,
            @PathVariable("gameTypeId") Integer gameTypeId
    ) {

        return new ResponseEntity<>(makeCommonResponse(SUCCESS, recordService.getRecordsByGameType(userId, gameTypeId)), HttpStatus.OK);
    }

    @GetMapping("/today/{userId}")
    public ResponseEntity<CommonResponse<List<RecordResponse>>> getExerciseRecordToday(
            @PathVariable("userId") Long userId
    ) {

        return new ResponseEntity<>(makeCommonResponse(SUCCESS, recordService.getRecordsToday(userId)), HttpStatus.OK);
    }

    @GetMapping("/date/{userId}")
    public ResponseEntity<CommonResponse<List<RecordResponse>>> getExerciseRecordDate(
            @PathVariable("userId") Long userId,
            @RequestBody RecordDateRequest recordDateRequest
    ) {

        return new ResponseEntity<>(makeCommonResponse(SUCCESS,
                recordService.getRecordsDate(userId, recordDateRequest.getDate())), HttpStatus.OK);
    }

    private <T> CommonResponse<T> makeCommonResponse(String message, T data) {
        return CommonResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }

}
