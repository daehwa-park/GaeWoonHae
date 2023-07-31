package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.api.dto.response.CommonResponse;
import com.threeracha.gaewoonhae.api.service.RoomService;

import com.threeracha.gaewoonhae.api.dto.request.NewRoomRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@Tag(name = "방관리 API", description = "방 접속, 생성, 게임 시작, 종료")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/room")
public class RoomController {

    private final RoomService roomService;


    static final String SUCCESS = "success";
    @Operation(summary = "최선의 방 조회", description = "게임 타입에 적합한 방이 있는 경우 roomId 반환, 아닐 경우 empty 반환")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = String.class)))
    })
    @GetMapping("/find")
    public ResponseEntity<CommonResponse<String>> findFitRoomByGameType(int gameType) {
        String findSessionId = roomService.findFitRoom(gameType);
        return new ResponseEntity<>(
                makeCommonResponse(SUCCESS, findSessionId), HttpStatus.OK);
    }

    @Operation(summary = "새로운 방 생성", description = "newRoomRequest 객체를 활용해서 새로운 방 생성 및 db 저장")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = String.class)))
    })
    @PostMapping("/make")
    public ResponseEntity<CommonResponse<String>> makeNewRoom(NewRoomRequest newRoomRequest) {
        String madeSessionId = roomService.makeNewRoom(newRoomRequest);
        return new ResponseEntity<>(
                makeCommonResponse(SUCCESS, madeSessionId), HttpStatus.OK);
    }

    @Operation(summary = "게임시작", description = "현재 roomStatus가 R 이고 유저가 5명이면 S 반환, 아니면 R 반환")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = Character.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = Character.class)))
    })
    @PostMapping("/start")
    public ResponseEntity<CommonResponse<Character>> GameStart(String sessionId) {
        Character roomStatus = roomService.startGame(sessionId);
        return new ResponseEntity<>(
                makeCommonResponse(SUCCESS, roomStatus), HttpStatus.OK);
    }

    @PostMapping("/end")
    public void GameFinish(NewRoomRequest makeNewRoomDto) {
    }

    private <T> CommonResponse<T> makeCommonResponse(String message, T data) {
        return CommonResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }

}
