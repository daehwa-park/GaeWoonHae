package com.threeracha.gaewoonhae.db.repository;

import com.threeracha.gaewoonhae.db.domain.Room;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;

@Repository
@RequiredArgsConstructor
public class RoomRepository {

    private final EntityManager em;

    public String findFitRoom(int gameType) {
        String fitRoomId ="empty";
        try {
            Room Fitroom = em.createQuery("SELECT r FROM Room r WHERE r.gameType = :gameType AND r.isPublicRoom = 'Y' AND r.currentUserNum < 5", Room.class)
                    .setParameter("gameType", gameType)
                    .setMaxResults(1)
                    .getSingleResult();
            Fitroom.setCurrentUserNum(Fitroom.getCurrentUserNum()+1);
            fitRoomId = Fitroom.getSessionId();
            return fitRoomId;
        } catch (NoResultException e) {
            return fitRoomId;
        }
    }

    public void makeNewRoom(Room newRoom) {
        em.persist(newRoom);
    }
}
