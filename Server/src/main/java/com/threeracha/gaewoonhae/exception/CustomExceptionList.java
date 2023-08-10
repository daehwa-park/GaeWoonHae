package com.threeracha.gaewoonhae.exception;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

import java.lang.reflect.Type;
import java.util.NoSuchElementException;

@Getter
@ToString
public enum CustomExceptionList {

    RUNTIME_EXCEPTION(HttpStatus.BAD_REQUEST, "E001", "잘못된 요청입니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "E002", "서버 오류 입니다."),
    ACCESS_TOKEN_ERROR(HttpStatus.UNAUTHORIZED, "E003", "엑세스 토큰 오류입니다."),
    REFRESH_TOKEN_ERROR(HttpStatus.UNAUTHORIZED, "E004", "리프레쉬 토큰 오류입니다."),
    USER_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "E005", "존재하지 않는 회원입니다."),
    EXERCISE_RECORD_NOT_EXIST(HttpStatus.INTERNAL_SERVER_ERROR, "E006", "운동기록이 서버에서 정상적으로 생성되지 않았습니다."),
    JOIN_INFO_NOT_EXIST(HttpStatus.NOT_FOUND, "E007", "가입정보가 유효하지 않습니다."),
    NO_AUTHENTICATION_ERROR(HttpStatus.FORBIDDEN, "E08", "접근 권한이 없습니다."),
    MEMBER_NOT_FOUND_ROOM(HttpStatus.NOT_FOUND,"E09", "운동방에 존재하지 않는 회원입니다."),
    ROOM_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND,"E10","존재하지 않는 게임방 입니다."),
    EMOJI_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "E11", "존재하지 않는 이모지입니다."),
    INVALID_HOST_ERROR(HttpStatus.UNAUTHORIZED, "E12", "호스트 권한이 없습니다." ),
    INVALID_GAMETYPE_ERROR(HttpStatus.NOT_FOUND, "E13", "일치하는 게임 타입이 존재하지 않습니다.");

    private final HttpStatus status;
    private final String code;
    private String message;

    CustomExceptionList(HttpStatus status, String code) {
        this.status = status;
        this.code = code;
    }

    CustomExceptionList(HttpStatus status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
}