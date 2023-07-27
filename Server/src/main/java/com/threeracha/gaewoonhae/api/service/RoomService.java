package com.threeracha.gaewoonhae.api.service;

import com.threeracha.gaewoonhae.db.domain.GameType;
import com.threeracha.gaewoonhae.db.domain.Room;
import com.threeracha.gaewoonhae.db.dto.MakeNewRoomDto;
import com.threeracha.gaewoonhae.db.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    @Transactional
    public void makeNewRoom(MakeNewRoomDto makeNewRoomDto) {
        System.out.println(makeNewRoomDto.getGameType());
    }

    @Transactional
    public String findFitRoom(int gameType) {
        Room fitRoom = roomRepository.findFitRoom(gameType);
        String FitSessionId =  fitRoom.getSessionId();

        return FitSessionId;
    }

}
