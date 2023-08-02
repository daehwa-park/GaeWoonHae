package com.threeracha.gaewoonhae.exception;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException{

    private final CustomExceptionList exception;

    public CustomException(CustomExceptionList e) {
        super(e.getMessage());
        this.exception = e;
    }
//    private final String message;
//    public CustomException(String message) {
//        super(message);
//        this.message = message;
//    }

}