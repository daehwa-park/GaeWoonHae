package com.threeracha.gaewoonhae.api.dto.response;

import com.threeracha.gaewoonhae.db.domain.Record;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class RecordResponse {
    Long gameRecordId;
    Integer gameTypeId;
    int count;
    Date recordDateTime;
    
    public RecordResponse(Record record) {
        this.gameRecordId = record.getGameRecordId();
        this.gameTypeId = record.getGameType().getGameType();
        this.count = record.getCount();
        this.recordDateTime = record.getRecordDateTime();
    }
}
