package com.threeracha.gaewoonhae.db.repository;

import com.threeracha.gaewoonhae.db.domain.Record;
import com.threeracha.gaewoonhae.db.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {

    Optional<List<Record>> findRecordsByUserUserId(Long userId);

    Optional<List<Record>> findRecordsByUserUserIdAndGameTypeGameType(Long userId, Integer gameType);

    Optional<List<Record>> findRecordsByUserUserIdAndRecordDateTimeBetween(
            Long user_userId,
            Timestamp startDateTime,
            Timestamp endDateTime);

}
