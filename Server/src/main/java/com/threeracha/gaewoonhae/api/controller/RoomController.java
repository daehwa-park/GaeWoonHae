package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.api.dto.response.CommonResponse;
import com.threeracha.gaewoonhae.api.service.RoomService;
import com.threeracha.gaewoonhae.db.dto.FindFitRoomDto;
import com.threeracha.gaewoonhae.db.dto.MakeNewRoomDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    RoomService roomService;
    @GetMapping("/find")
    public ResponseEntity<CommonResponse> findFitRoomByGameType(FindFitRoomDto findFitRoomDto) {
        int gameType = findFitRoomDto.getGameType();
        roomService.findFitRoom(gameType);
        CommonResponse commonResponse = new CommonResponse();
        return ResponseEntity.ok(commonResponse);
    }

    @PostMapping("/make")
    public void makeNewRoom(MakeNewRoomDto makeNewRoomDto) {
        System.out.println(makeNewRoomDto.getGameType());
        roomService.makeNewRoom(makeNewRoomDto);
    }

    @PostMapping("/start")
    public void roomGameStart(MakeNewRoomDto makeNewRoomDto) {
    }

    @PostMapping("/end")
    public void roomGameFinish(MakeNewRoomDto makeNewRoomDto) {
    }

}
