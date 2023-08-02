package com.threeracha.gaewoonhae.api.service;

import com.threeracha.gaewoonhae.api.dto.request.NewRoomRequest;
import com.threeracha.gaewoonhae.db.domain.GameType;
import com.threeracha.gaewoonhae.db.domain.Room;
import com.threeracha.gaewoonhae.db.domain.User;
import com.threeracha.gaewoonhae.db.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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
        String makeSessionId = this.generateSessionId();
        Room newRoom = new Room(makeSessionId, findUser, gameType, 1, 5,isPublicRoom,'R');
        String madeSessionId = roomRepository.makeNewRoom(newRoom);
        return madeSessionId;
    }

    @Transactional
    public String findFitRoom(int gameTypeId) {
        GameType gameType = roomRepository.findGameType(gameTypeId);
        String findSessionId  = roomRepository.findFitRoom(gameType);
        return findSessionId;
    }

    public String generateSessionId() {
        String passwordSource = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        int passwordSourceLength = passwordSource.length();

        // 8자리 암호문 생성
        StringBuilder sessionIdBuilder = new StringBuilder();
        for (int i = 0; i < 8; i++) {
            int randomIndex = (int) (Math.random() * passwordSourceLength);
            sessionIdBuilder.append(passwordSource.charAt(randomIndex));
        }
        return sessionIdBuilder.toString();
    }

    @Transactional
    public Character startGame(String SessionId) {
        Room findRoom = roomRepository.findRoomBySessionId(SessionId);
        Character roomStatus = roomRepository.gameStart(findRoom);
        return roomStatus;
    }
}
