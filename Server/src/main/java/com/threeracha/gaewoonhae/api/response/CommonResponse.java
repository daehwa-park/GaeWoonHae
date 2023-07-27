package com.threeracha.gaewoonhae.api.response;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Setter
@Slf4j
public class CommonResponse<T> {
    String message;
    T data;
}
