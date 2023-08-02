package com.threeracha.gaewoonhae.api.dto.response;

import com.threeracha.gaewoonhae.db.domain.PointHistory;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class PointHistoryResponse {
    int point;
    Timestamp changeDate;

    public PointHistoryResponse(PointHistory pointHistory) {
        this.point = pointHistory.getPointChange();
        this.changeDate = pointHistory.getChangeTime();
    }
}
