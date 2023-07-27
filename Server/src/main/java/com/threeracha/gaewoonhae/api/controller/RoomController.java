package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.api.dto.response.CommonResponse;
import com.threeracha.gaewoonhae.api.service.RoomService;
import com.threeracha.gaewoonhae.db.dto.FindFitRoomDto;
import com.threeracha.gaewoonhae.db.dto.MakeNewRoomDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/make")
    public void makeNewRoom(MakeNewRoomDto makeNewRoomDto) {
        System.out.println(makeNewRoomDto.getGameType());
        roomService.makeNewRoom(makeNewRoomDto);
    }

}
