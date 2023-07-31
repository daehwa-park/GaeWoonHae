package com.threeracha.gaewoonhae.api.service;

import com.threeracha.gaewoonhae.api.dto.response.RecordResponse;
import com.threeracha.gaewoonhae.db.domain.Record;
import com.threeracha.gaewoonhae.db.repository.RecordRepository;
import com.threeracha.gaewoonhae.exception.CustomException;
import com.threeracha.gaewoonhae.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class RecordService {

    final RecordRepository recordRepository;

    public List<RecordResponse> getAllRecord(Long userId) {

        List<Record> records = recordRepository.findRecordsByUserUserId(userId)
                .orElseThrow(() -> new CustomException("운동 기록을 조회할 수 없습니다."));

        return records.stream()
                .map(RecordResponse::new)
                .collect(Collectors.toList());
    }


}
