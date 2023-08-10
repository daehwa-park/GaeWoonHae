package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.api.dto.request.RecordDateRequest;
import com.threeracha.gaewoonhae.api.dto.request.SaveRecordRequest;
import com.threeracha.gaewoonhae.api.dto.response.CommonResponse;
import com.threeracha.gaewoonhae.api.dto.response.RecordResponse;
import com.threeracha.gaewoonhae.api.dto.response.UserInfoResponse;
import com.threeracha.gaewoonhae.api.service.RecordService;
import com.threeracha.gaewoonhae.exception.ExceptionResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "기록 관리 API", description = "사용자 게임 기록 조회")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/record")
public class RecordController {

    final RecordService recordService;
    final String SUCCESS = "success";

    @Operation(summary = "게임 기록 저장", description = "게임 정보를 저장함")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = RecordResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = ExceptionResponse.class)))
    })
    @PostMapping("/save")
    public ResponseEntity<CommonResponse<RecordResponse>> saveRecord(@RequestBody SaveRecordRequest saveRecordReq) {
        return new ResponseEntity<>(makeCommonResponse(SUCCESS,
                new RecordResponse(recordService.saveRecord(saveRecordReq))),
                HttpStatus.OK);
    }

    @Operation(summary = "게임 기록 전체 조회", description = "파라미터로 받은 userId와 일치하는 게임 기록 전체를 전달.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = RecordResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = ExceptionResponse.class)))
    })
    @Parameter(name = "userId", description = "조회할 사용자의 userId")
    @GetMapping("/{userId}")
    public ResponseEntity<CommonResponse<List<RecordResponse>>> getExerciseRecord(@PathVariable("userId") Long userId) {

        return new ResponseEntity<>(makeCommonResponse(SUCCESS, recordService.getAllRecord(userId)), HttpStatus.OK);
    }

    @Operation(summary = "게임 타입 별 기록 조회", description = "파라미터로 받은 gameTypeId와 userId와 일치하는 게임 기록을 전달.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = RecordResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = ExceptionResponse.class)))
    })
    @Parameter(name = "gameTypeId", description = "조회할 게임 타입")
    @Parameter(name = "userId", description = "조회할 사용자의 userId")
    @GetMapping("/{gameTypeId}/{userId}")
    public ResponseEntity<CommonResponse<List<RecordResponse>>> getExerciseRecordByGameType(
            @PathVariable("userId") Long userId,
            @PathVariable("gameTypeId") Integer gameTypeId
    ) {

        return new ResponseEntity<>(makeCommonResponse(SUCCESS, recordService.getRecordsByGameType(userId, gameTypeId)), HttpStatus.OK);
    }

    @Operation(summary = "오늘 게임 기록 조회", description = "파라미터로 받은 userId와 일치하는 오늘자 게임 기록을 전달.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = RecordResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = ExceptionResponse.class)))
    })
    @Parameter(name = "userId", description = "조회할 사용자의 userId")
    @GetMapping("/today/{userId}")
    public ResponseEntity<CommonResponse<List<RecordResponse>>> getExerciseRecordToday(
            @PathVariable("userId") Long userId
    ) {

        return new ResponseEntity<>(makeCommonResponse(SUCCESS, recordService.getRecordsToday(userId)), HttpStatus.OK);
    }

    @Operation(summary = "일자별 게임 기록 조회", description = "파라미터로 받은 userId와 RequestBody의 날짜를 통해 일치하는 게임 기록을 전달.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = RecordResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = ExceptionResponse.class)))
    })
    @Parameter(name = "userId", description = "조회할 사용자의 userId")
    @PostMapping("/date/{userId}")
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
