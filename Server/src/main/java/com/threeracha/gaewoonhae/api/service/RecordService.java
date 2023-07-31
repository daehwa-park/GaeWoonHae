package com.threeracha.gaewoonhae.api.service;

import com.threeracha.gaewoonhae.api.dto.response.RecordResponse;
import com.threeracha.gaewoonhae.db.domain.Record;
import com.threeracha.gaewoonhae.db.repository.RecordRepository;
import com.threeracha.gaewoonhae.exception.CustomException;
import com.threeracha.gaewoonhae.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class RecordService {

    final RecordRepository recordRepository;

    public List<RecordResponse> getAllRecord(Long userId) {

        List<Record> records = recordRepository.findRecordsByUserUserId(userId)
                .orElseThrow(() -> new CustomException("운동 기록을 조회할 수 없습니다."));

        return records.stream()
                .map(RecordResponse::new)
                .collect(Collectors.toList());
    }

    public List<RecordResponse> getRecordsByGameType(Long userId, Integer gameTypeId) {

        List<Record> records = recordRepository.findRecordsByUserUserIdAndGameTypeGameType(userId, gameTypeId)
                .orElseThrow(() -> new CustomException("운동 기록을 조회할 수 없습니다."));

        return records.stream()
                .map(RecordResponse::new)
                .collect(Collectors.toList());
    }

    public List<RecordResponse> getRecordsToday(Long userId) {

        Date today = new Date(System.currentTimeMillis());
        List<Record> records = recordRepository.findRecordsByUserUserIdAndRecordDateTime(userId, today)
                .orElseThrow(() -> new CustomException("운동 기록을 조회할 수 없습니다."));

        return records.stream()
                .map(RecordResponse::new)
                .collect(Collectors.toList());
    }

}
