package com.threeracha.gaewoonhae.api.service;

import com.threeracha.gaewoonhae.api.dto.response.EmojiResponse;
import com.threeracha.gaewoonhae.api.dto.response.PointHistoryResponse;
import com.threeracha.gaewoonhae.db.domain.PointHistory;
import com.threeracha.gaewoonhae.db.domain.User;
import com.threeracha.gaewoonhae.db.repository.PointHistoryRepository;
import com.threeracha.gaewoonhae.db.repository.UserRepository;
import com.threeracha.gaewoonhae.exception.CustomException;
import com.threeracha.gaewoonhae.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PointHistoryService {
    private final UserRepository userRepository;
    final PointHistoryRepository pointHistoryRepository;

    public List<PointHistoryResponse> getPointHistoryList(Long userId){
        return pointHistoryRepository.findByUserUserId(userId)
                .stream()
                .map(PointHistoryResponse::new)
                .collect(Collectors.toList());

    }
    @Transactional(readOnly = false)
    public void addPointHistory(Long userId, int emojiPrice) {
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));

        PointHistory pointHistory = new PointHistory();

        pointHistory.setUser(user);
        pointHistory.setPointChange(emojiPrice);

        // [SQL 타임 스탬프 사용해 현재 및 날짜 데이터 변환 실시]
        Timestamp timeStamp = new Timestamp(System.currentTimeMillis());

        pointHistory.setChangeTime(timeStamp);

        pointHistoryRepository.save(pointHistory);

    }
}
