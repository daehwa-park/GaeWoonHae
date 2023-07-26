package com.threeracha.gaewoonhae.db.repository;

import com.threeracha.gaewoonhae.db.domain.GameType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameTypeRepository extends JpaRepository<GameType, Integer> {


}
