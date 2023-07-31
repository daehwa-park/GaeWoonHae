package com.threeracha.gaewoonhae.db.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor //기본 생성자 만들어줌
@AllArgsConstructor //여기에 필드에 쓴 모든생성자만 만들어줌
public class MakeNewRoomDto {
    private char isPublicRoom;
    private Long userId;
    private int gameType;
    private int timeLimit;
}
