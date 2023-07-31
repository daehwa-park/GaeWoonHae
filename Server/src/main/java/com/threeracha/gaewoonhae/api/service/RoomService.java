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
    public String makeNewRoom(MakeNewRoomDto makeNewRoomDto) {
        int gameType = makeNewRoomDto.getGameType();
        char isPublicRoom = makeNewRoomDto.getIsPublicRoom();
        Long userId = makeNewRoomDto.getUserId();
        Room newRoom = new Room("sessionId", userId, gameType, 1, 5, isPublicRoom,'R');
        return "hi";
    }

    @Transactional
    public String findFitRoom(int gameType) {
        String fitRoomId  = roomRepository.findFitRoom(gameType);

        return fitRoomId;
    }

}
