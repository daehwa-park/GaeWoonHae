package com.threeracha.gaewoonhae.api.service;

import com.threeracha.gaewoonhae.api.dto.request.NewRoomRequest;
import com.threeracha.gaewoonhae.api.dto.response.RoomInfoResponse;
import com.threeracha.gaewoonhae.db.domain.GameType;
import com.threeracha.gaewoonhae.db.domain.Room;
import com.threeracha.gaewoonhae.db.domain.User;
import com.threeracha.gaewoonhae.db.repository.RoomRepository;
import com.threeracha.gaewoonhae.exception.CustomException;
import com.threeracha.gaewoonhae.exception.CustomExceptionList;
import com.threeracha.gaewoonhae.utils.RandomCodeGenerator;
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
                .orElseThrow(() -> new CustomException(CustomExceptionList.ROOM_NOT_FOUND_ERROR));
        int updateUserNum = roomByGameType.getCurrentUserNum()+1;
        roomByGameType.setCurrentUserNum(updateUserNum);

        return roomByGameType.getSessionId();
    }

    public String findRoomBySessionId(String sessionId) {
        Room roomBySessionId = roomRepository.findRoomBySessionId(sessionId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.ROOM_NOT_FOUND_ERROR));

        return roomBySessionId.getSessionId();
    }

    public RoomInfoResponse makeNewRoom(NewRoomRequest newRoomRequest) {
        User findUser = userService.getUserInfo(newRoomRequest.getUserId());
        GameType gameType = roomRepository.findGameType(newRoomRequest.getGameType());
        char isPublicRoom = newRoomRequest.getIsPublicRoom();
        String makeSessionId = RandomCodeGenerator.getRandomCode(8);
        Room newRoom = new Room(makeSessionId, findUser, gameType, 1, 5,isPublicRoom,'R');
        String madeSessionId = roomRepository.makeNewRoom(newRoom);
        String nickname = findUser.getNickname();

        return new RoomInfoResponse(madeSessionId, nickname);
    }

    public Character startGame(String SessionId) {
        Room findRoom = roomRepository.findRoomBySessionId(SessionId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.ROOM_NOT_FOUND_ERROR));;
        if(findRoom.getRoomStatus()=='R' && findRoom.getCurrentUserNum()==5) {
            findRoom.setRoomStatus('S');
            return 'S';
        }
        return 'R';
    }
}
