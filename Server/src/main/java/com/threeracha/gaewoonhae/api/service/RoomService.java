package com.threeracha.gaewoonhae.api.service;

import com.threeracha.gaewoonhae.api.dto.request.NewRoomRequest;
import com.threeracha.gaewoonhae.db.domain.GameType;
import com.threeracha.gaewoonhae.db.domain.Room;
import com.threeracha.gaewoonhae.db.domain.User;
import com.threeracha.gaewoonhae.db.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;
    private final UserService userService;
    @Transactional
    public String makeNewRoom(NewRoomRequest newRoomRequest) {
        User findUser = userService.getUserInfo(newRoomRequest.getUserId());
        GameType gameType = roomRepository.findGameType(newRoomRequest.getGameType());
        char isPublicRoom = newRoomRequest.getIsPublicRoom();
        String makeSessionId = "sessionB";
        Room newRoom = new Room(makeSessionId, findUser, gameType, 1, 5,isPublicRoom,'R');
        roomRepository.makeNewRoom(newRoom);
        return newRoom.getSessionId();
    }

    @Transactional
    public String findFitRoom(int gameTypeId) {
        GameType gameType = roomRepository.findGameType(gameTypeId);
        String findSessionId  = roomRepository.findFitRoom(gameType);

        return findSessionId;
    }

}
