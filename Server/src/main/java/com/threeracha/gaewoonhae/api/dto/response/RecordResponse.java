package com.threeracha.gaewoonhae.api.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.threeracha.gaewoonhae.db.domain.Record;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Date;

@Getter
@Setter
public class RecordResponse {

    Long gameRecordId;
    Integer gameTypeId;
    int count;

    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Seoul")
    Timestamp recordDateTime;
    
    public RecordResponse(Record record) {
        this.gameRecordId = record.getGameRecordId();
        this.gameTypeId = record.getGameType().getGameType();
        this.count = record.getCount();
        this.recordDateTime = record.getRecordDateTime();
    }
}
