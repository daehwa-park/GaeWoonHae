package com.threeracha.gaewoonhae.api.service;

import com.threeracha.gaewoonhae.api.dto.request.NewRoomRequest;
import com.threeracha.gaewoonhae.db.domain.GameType;
import com.threeracha.gaewoonhae.db.domain.Room;
import com.threeracha.gaewoonhae.db.domain.User;
import com.threeracha.gaewoonhae.db.repository.RoomRepository;
import com.threeracha.gaewoonhae.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;
    private final UserService userService;

    public String findRoomByGameType(int gameTypeId) {
        GameType gameType = roomRepository.findGameType(gameTypeId);
        Room roomByGameType = roomRepository.findRoomByGameType(gameType)
                .orElseThrow(() -> new CustomException("빈 게임방이 없습니다."));
        int updateUserNum = roomByGameType.getCurrentUserNum()+1;
        roomByGameType.setCurrentUserNum(updateUserNum);
        String findSessionId = roomByGameType.getSessionId();
        return findSessionId;
    }

    public String findRoomBySessionId(String sessionId) {
        Room roomBySessionId = roomRepository.findRoomBySessionId(sessionId)
                .orElseThrow(() -> new CustomException("해당 게임방이 없습니다."));
        String findSessionId = roomBySessionId.getSessionId();
        return findSessionId;
    }

    public String makeNewRoom(NewRoomRequest newRoomRequest) {
        User findUser = userService.getUserInfo(newRoomRequest.getUserId());
        GameType gameType = roomRepository.findGameType(newRoomRequest.getGameType());
        char isPublicRoom = newRoomRequest.getIsPublicRoom();
        String makeSessionId = this.generateSessionId();
        Room newRoom = new Room(makeSessionId, findUser, gameType, 1, 5,isPublicRoom,'R');
        String madeSessionId = roomRepository.makeNewRoom(newRoom);
        return madeSessionId;
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


    public Character startGame(String SessionId) {
        Room findRoom = roomRepository.findRoomBySessionId(SessionId)
                .orElseThrow(() -> new CustomException("해당 게임방이 없습니다."));;
        if(findRoom.getRoomStatus()=='R' && findRoom.getCurrentUserNum()==5) {
            findRoom.setRoomStatus('S');
            return 'S';
        }
        return 'R';
    }
}
