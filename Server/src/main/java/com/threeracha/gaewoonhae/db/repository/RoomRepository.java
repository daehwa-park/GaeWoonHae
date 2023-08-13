package com.threeracha.gaewoonhae.db.repository;

import com.threeracha.gaewoonhae.db.domain.GameType;
import com.threeracha.gaewoonhae.db.domain.Room;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class RoomRepository {

    private final EntityManager em;

    public GameType findGameType(int gameTypeId) {
        GameType gameType = em.find(GameType.class, gameTypeId);
        return gameType;
    }

    public Optional<Room> findRoomByGameType(GameType gameType) {
        Room findRoom = em.createQuery("SELECT r FROM Room r WHERE r.gameType = :gameType AND r.isPublicRoom = 'Y' AND r.roomStatus = 'R' AND r.currentUserNum < 5", Room.class)
                .setParameter("gameType", gameType)
                .setMaxResults(1)
                .getSingleResult();

        return Optional.ofNullable(findRoom);
    }

    public void makeNewRoom(Room newRoom) {
        em.persist(newRoom);
    }

    public Optional<Room> findRoomBySessionId(String SessionId) {
        Room  findRoom = em.find(Room.class, SessionId);
        return Optional.ofNullable(findRoom);
    }


}

