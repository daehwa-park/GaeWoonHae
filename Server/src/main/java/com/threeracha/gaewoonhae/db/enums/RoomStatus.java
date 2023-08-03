package com.threeracha.gaewoonhae.db.enums;

public enum RoomStatus {
    READY('R'),
    START('S'),
    CLOSED('C');

    private final char code;

    RoomStatus(char code) {
        this.code = code;
    }

    public char code() {
        return code;
    }


}
