package com.threeracha.gaewoonhae.api.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Schema(description = "날짜별 게임 기록 조회용 request")
@Getter
@Setter
public class RecordDateRequest {

    @Schema(description = "조회할 날짜 (YY-mm-dd")
    Timestamp date;
}
