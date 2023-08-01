package com.threeracha.gaewoonhae.api.dto.request;

import com.threeracha.gaewoonhae.db.domain.Emoji;
import lombok.Getter;

@Getter
public class BuyEmojiRequest {
    Long userId;
    Long emojiId;
    int emojiPrice;
}
