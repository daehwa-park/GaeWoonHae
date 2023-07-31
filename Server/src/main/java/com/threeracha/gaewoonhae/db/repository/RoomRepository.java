package com.threeracha.gaewoonhae.db.repository;

import com.threeracha.gaewoonhae.db.domain.GameType;
import com.threeracha.gaewoonhae.db.domain.Room;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;

@Repository
@RequiredArgsConstructor
public class RoomRepository {

    private final EntityManager em;

    public GameType findGameType(int gameTypeId) {
        GameType gameType = em.find(GameType.class, gameTypeId);
        return gameType;
    }

    public String findFitRoom(GameType gameType) {
        String findSessionId ="empty";
        try {
            Room Fitroom = em.createQuery("SELECT r FROM Room r WHERE r.gameType = :gameType AND r.isPublicRoom = 'Y' AND r.currentUserNum < 5", Room.class)
                    .setParameter("gameType", gameType)
                    .setMaxResults(1)
                    .getSingleResult();
            Fitroom.setCurrentUserNum(Fitroom.getCurrentUserNum()+1);
            findSessionId = Fitroom.getSessionId();
            return findSessionId;
        } catch (NoResultException e) {
            return findSessionId;
        }
    }

    public void makeNewRoom(Room newRoom) {
        em.persist(newRoom);
    }
}
