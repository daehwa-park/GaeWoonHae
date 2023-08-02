package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.api.dto.request.SetRoomStatusRequest;
import com.threeracha.gaewoonhae.api.dto.response.CommonResponse;
import com.threeracha.gaewoonhae.api.dto.response.RoomInfoResponse;
import com.threeracha.gaewoonhae.api.service.RoomService;

import com.threeracha.gaewoonhae.api.dto.request.NewRoomRequest;
import com.threeracha.gaewoonhae.utils.RandomCodeGenerator;
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
import org.springframework.web.bind.annotation.*;

@Tag(name = "방관리 API", description = "방 접속, 생성, 게임 시작, 종료")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/room")
public class RoomController {

    private final RoomService roomService;


    static final String SUCCESS = "success";

    @GetMapping("/random")
    public ResponseEntity<CommonResponse<String>> getRandomCode() {
        return new ResponseEntity<>(makeCommonResponse(SUCCESS, RandomCodeGenerator.getRandomCode(8)),
                HttpStatus.OK);
    }

    @Operation(summary = "최선의 방 조회", description = "게임 타입에 적합한 방이 있는 경우 sessionId 반환, 아닐 경우 customException 반환")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = String.class)))
    })
    @GetMapping("/find")
    public ResponseEntity<CommonResponse<String>> findRoomByGameType(int gameType) {
        String findSessionId = roomService.findRoomByGameType(gameType);
        return new ResponseEntity<>(
                makeCommonResponse(SUCCESS, findSessionId), HttpStatus.OK);
    }

    @Operation(summary = "초대코드로 방 조회", description = "초대코드에 해당하는 방이 있는 경우 sessionId 반환, 아닐 경우 customException 반환")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = String.class)))
    })
    @PostMapping("/find")
    public ResponseEntity<CommonResponse<String>> findRoomBySessionId(@RequestBody SetRoomStatusRequest setRoomStatusRequest) {
        String sessionId = setRoomStatusRequest.getSessionId();
        String roomBySessionId = roomService.findRoomBySessionId(sessionId);

        return new ResponseEntity<>(
                makeCommonResponse(SUCCESS, roomBySessionId), HttpStatus.OK);
    }


    @Operation(summary = "새로운 방 생성", description = "newRoomRequest 객체를 활용해서 새로운 방 생성 및 db 저장")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = String.class)))
    })
    @PostMapping("/make")
    public ResponseEntity<CommonResponse<RoomInfoResponse>> makeNewRoom(@RequestBody NewRoomRequest newRoomRequest) {
        RoomInfoResponse roomInfoResponse = roomService.makeNewRoom(newRoomRequest);
        return new ResponseEntity<>(
                makeCommonResponse(SUCCESS, roomInfoResponse), HttpStatus.OK);
    }

    @Operation(summary = "게임시작", description = "현재 roomStatus가 R 이고 유저가 5명이면 S 반환, 아니면 R 반환")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = Character.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = Character.class)))
    })
    @PostMapping("/start")
    public ResponseEntity<CommonResponse<Character>> GameStart(@RequestBody SetRoomStatusRequest request) {
        return new ResponseEntity<>(makeCommonResponse(SUCCESS, roomService.startRoom(request)), HttpStatus.OK);
    }

    @PostMapping("/finish")
    public ResponseEntity<CommonResponse<Character>> GameFinish(@RequestBody SetRoomStatusRequest request) {

        return new ResponseEntity<>(makeCommonResponse(SUCCESS, roomService.finishRoom(request)), HttpStatus.OK);
    }

    @PostMapping("/close")
    public ResponseEntity<CommonResponse<Character>> CloseRoom(@RequestBody SetRoomStatusRequest request) {

        return new ResponseEntity<>(makeCommonResponse(SUCCESS, roomService.closeRoom(request)), HttpStatus.OK);
    }

    private <T> CommonResponse<T> makeCommonResponse(String message, T data) {
        return CommonResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }

}
