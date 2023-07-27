package com.threeracha.gaewoonhae.api.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Getter
public class CommonResponse<T> {
    private String message;
    private T data;

    @Builder
    public CommonResponse(String message, T data) {
        this.message = message;
        this.data = data;
    }

    public CommonResponse() {

    }
}
