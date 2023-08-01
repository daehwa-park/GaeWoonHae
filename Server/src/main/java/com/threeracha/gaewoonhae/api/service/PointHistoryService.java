package com.threeracha.gaewoonhae.api.service;

import com.threeracha.gaewoonhae.db.domain.PointHistory;
import com.threeracha.gaewoonhae.db.domain.User;
import com.threeracha.gaewoonhae.db.repository.PointHistoryRepository;
import com.threeracha.gaewoonhae.db.repository.UserRepository;
import com.threeracha.gaewoonhae.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PointHistoryService {
    private final UserRepository userRepository;
    final PointHistoryRepository pointHistoryRepository;

    public List<PointHistory> getPointHistoryList(Long userId){

        return pointHistoryRepository.findByUserUserId(userId);

    }

    public void addPointHistory(Long userId, int emojiPrice) {
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException("멤버를 찾을 수 없습니다."));

        PointHistory pointHistory = new PointHistory();


        pointHistory.setUser(user);
        pointHistory.setPointChange(emojiPrice*(-1));

        // [SQL 타임 스탬프 사용해 현재 및 날짜 데이터 변환 실시]
        long nowDate = System.currentTimeMillis();
        Timestamp timeStamp = new Timestamp(nowDate);

        pointHistory.setChangeTime(timeStamp);

        pointHistoryRepository.save(pointHistory);

    }
}
