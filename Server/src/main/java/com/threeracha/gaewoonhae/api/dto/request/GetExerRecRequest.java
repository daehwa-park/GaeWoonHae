package com.threeracha.gaewoonhae.api.dto.request;

import lombok.Getter;

import java.sql.Date;

@Getter
public class GetExerRecRequest {

    Long userId;
    Date startDate;
    Date endDate;
    int gameType;

}
