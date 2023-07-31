package com.threeracha.gaewoonhae.db.repository;

import com.threeracha.gaewoonhae.db.domain.Record;
import com.threeracha.gaewoonhae.db.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {

    Optional<List<Record>> findRecordsByUserUserId(Long userId);

}
