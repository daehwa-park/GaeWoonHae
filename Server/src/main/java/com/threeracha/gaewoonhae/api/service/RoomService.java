package com.threeracha.gaewoonhae.api.service;

import com.threeracha.gaewoonhae.api.dto.request.LeaveRoomRequest;
import com.threeracha.gaewoonhae.api.dto.request.NewRoomRequest;
import com.threeracha.gaewoonhae.api.dto.request.SessionIdRequest;
import com.threeracha.gaewoonhae.api.dto.request.SetRoomStatusRequest;
import com.threeracha.gaewoonhae.api.dto.response.RoomInfoResponse;
import com.threeracha.gaewoonhae.db.domain.GameType;
import com.threeracha.gaewoonhae.db.domain.Room;
import com.threeracha.gaewoonhae.db.domain.User;
import com.threeracha.gaewoonhae.db.enums.RoomStatus;
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

    public RoomInfoResponse findRoomByGameType(int gameTypeId) {
        GameType gameType = roomRepository.findGameType(gameTypeId);
        Room roomByGameType = roomRepository.findRoomByGameType(gameType)
                .orElseThrow(() -> new CustomException(CustomExceptionList.ROOM_NOT_FOUND_ERROR));
        return new RoomInfoResponse(roomByGameType);
    }

    public RoomInfoResponse findRoomBySessionId(String sessionId) {
        Room roomBySessionId = roomRepository.findRoomBySessionId(sessionId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.ROOM_NOT_FOUND_ERROR));

        return new RoomInfoResponse(roomBySessionId);
    }

    public RoomInfoResponse leaveRoom(LeaveRoomRequest leaveRoomRequest) {
        Room roomBySessionId = roomRepository.findRoomBySessionId(leaveRoomRequest.getSessionId())
                .orElseThrow(() -> new CustomException(CustomExceptionList.ROOM_NOT_FOUND_ERROR));

        int currentUserNum = roomBySessionId.getCurrentUserNum();
        User hostUser = userService.getUserInfo(leaveRoomRequest.getUserId());
        roomBySessionId.setCurrentUserNum(currentUserNum-1);
        if(roomBySessionId.getUser()==hostUser) {
            roomBySessionId.setRoomStatus(RoomStatus.CLOSED.code());
        }
        return new RoomInfoResponse(roomBySessionId);
    }

    public RoomInfoResponse arriveRoom(SessionIdRequest sessionIdRequest) {
        Room roomBySessionId = roomRepository.findRoomBySessionId(sessionIdRequest.getSessionId())
                .orElseThrow(() -> new CustomException(CustomExceptionList.ROOM_NOT_FOUND_ERROR));

        int currentUserNum = roomBySessionId.getCurrentUserNum();
        roomBySessionId.setCurrentUserNum(currentUserNum+1);
        return new RoomInfoResponse(roomBySessionId);
    }


    public RoomInfoResponse makeNewRoom(NewRoomRequest newRoomRequest) {
        User findUser = userService.getUserInfo(newRoomRequest.getUserId());
        GameType gameType = roomRepository.findGameType(newRoomRequest.getGameType());
        char isPublicRoom = newRoomRequest.getIsPublicRoom();
        String makeSessionId = RandomCodeGenerator.getRandomCode(8);
        Room newRoom = new Room(makeSessionId, findUser, gameType, 0, 5,isPublicRoom,'R');
        roomRepository.makeNewRoom(newRoom);
        return new RoomInfoResponse(newRoom);
    }

    public Character startRoom(SetRoomStatusRequest request) {
        Room room = roomRepository.findRoomBySessionId(request.getSessionId())
                .orElseThrow(() -> new CustomException(CustomExceptionList.ROOM_NOT_FOUND_ERROR));

        if (request.getGameType() != room.getGameType().getGameType()) {
            throw new CustomException(CustomExceptionList.INVALID_HOST_ERROR);
        }

        room.setRoomStatus(RoomStatus.START.code());

        return RoomStatus.START.code();
    }

    public char finishRoom(SetRoomStatusRequest request) {
        Room room = roomRepository.findRoomBySessionId(request.getSessionId())
                .orElseThrow(() -> new CustomException(CustomExceptionList.ROOM_NOT_FOUND_ERROR));

        if (request.getGameType() != room.getGameType().getGameType())  {
            throw new CustomException(CustomExceptionList.INVALID_HOST_ERROR);
        }

        room.setRoomStatus(RoomStatus.READY.code());

        return RoomStatus.READY.code();

    }

    public char closeRoom(SetRoomStatusRequest request) {
        Room room = roomRepository.findRoomBySessionId(request.getSessionId())
                .orElseThrow(() -> new CustomException(CustomExceptionList.ROOM_NOT_FOUND_ERROR));

        if (request.getGameType() != room.getGameType().getGameType())  {
            throw new CustomException(CustomExceptionList.INVALID_HOST_ERROR);
        }

        room.setRoomStatus(RoomStatus.CLOSED.code());

        return RoomStatus.CLOSED.code();

    }
}
