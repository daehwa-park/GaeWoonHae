package com.threeracha.gaewoonhae.api.service;

import com.threeracha.gaewoonhae.api.dto.request.SaveRecordRequest;
import com.threeracha.gaewoonhae.api.dto.response.RecordResponse;
import com.threeracha.gaewoonhae.db.domain.GameType;
import com.threeracha.gaewoonhae.db.domain.PointHistory;
import com.threeracha.gaewoonhae.db.domain.Record;
import com.threeracha.gaewoonhae.db.domain.User;
import com.threeracha.gaewoonhae.db.repository.GameTypeRepository;
import com.threeracha.gaewoonhae.db.repository.PointHistoryRepository;
import com.threeracha.gaewoonhae.db.repository.RecordRepository;
import com.threeracha.gaewoonhae.db.repository.UserRepository;
import com.threeracha.gaewoonhae.exception.CustomException;
import com.threeracha.gaewoonhae.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class RecordService {

    final RecordRepository recordRepository;
    final UserRepository userRepository;
    final GameTypeRepository gameTypeRepository;
    final PointHistoryRepository pointHisotryRepository;

    public List<RecordResponse> getAllRecord(Long userId) {

        List<Record> records = recordRepository.findRecordsByUserUserId(userId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.EXERCISE_RECORD_NOT_EXIST));

        return records.stream()
                .map(RecordResponse::new)
                .collect(Collectors.toList());
    }

    public List<RecordResponse> getRecordsByGameType(Long userId, Integer gameTypeId) {

        List<Record> records = recordRepository.findRecordsByUserUserIdAndGameTypeGameType(userId, gameTypeId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.EXERCISE_RECORD_NOT_EXIST));

        return records.stream()
                .map(RecordResponse::new)
                .collect(Collectors.toList());
    }

    public List<RecordResponse> getRecordsToday(Long userId) {

        Timestamp startDatetime = Timestamp.valueOf(
                LocalDateTime.of(LocalDate.now(), LocalTime.of(0,0,0)));

        Timestamp endDatetime = Timestamp.valueOf(
                LocalDateTime.of(LocalDate.now(), LocalTime.of(23,59,59)));

        List<Record> records = recordRepository.findRecordsByUserUserIdAndRecordDateTimeBetween(userId, startDatetime, endDatetime)
                .orElseThrow(() -> new CustomException(CustomExceptionList.EXERCISE_RECORD_NOT_EXIST));

        return records.stream()
                .map(RecordResponse::new)
                .collect(Collectors.toList());
    }

    public List<RecordResponse> getRecordsDate(Long userId, Timestamp startDatetime) {

       Timestamp startDateTimeZero = Timestamp.valueOf(
                LocalDateTime.of(startDatetime
                                .toLocalDateTime()
                                .toLocalDate(),
                        LocalTime.of(0,0,0)));

        Timestamp endDatetime = Timestamp.valueOf(
                LocalDateTime.of(startDatetime
                                            .toLocalDateTime()
                                            .toLocalDate(),
                LocalTime.of(23,59,59)));

        List<Record> records = recordRepository.findRecordsByUserUserIdAndRecordDateTimeBetween(userId, startDateTimeZero, endDatetime)
                .orElseThrow(() -> new CustomException(CustomExceptionList.EXERCISE_RECORD_NOT_EXIST));

        return records.stream()
                .map(RecordResponse::new)
                .collect(Collectors.toList());
    }

    public Record saveRecord(SaveRecordRequest req) {

        User user = userRepository.findById(req.getUserId())
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));

        GameType gameType = gameTypeRepository.findById(req.getGameType())
                .orElseThrow(() -> new CustomException(CustomExceptionList.INVALID_GAMETYPE_ERROR));

        int point = req.getCount() * 5;
        Timestamp current = new Timestamp(System.currentTimeMillis());

        user.setPoint(user.getPoint() + point);

        PointHistory history = PointHistory.builder()
                .user(user)
                .pointChange(point)
                .changeTime(current)
                .build();

        pointHisotryRepository.save(history);

        Record record = Record.builder()
                .gameType(gameType)
                .user(user)
                .count(req.getCount())
                .recordDateTime(current)
                .build();

        return recordRepository.save(record);
    }
}
