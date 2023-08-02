package com.threeracha.gaewoonhae.api.dto.response;

import com.threeracha.gaewoonhae.db.domain.Emoji;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BuyEmojiResponse {
    Long emojiId;
    int point;

    public BuyEmojiResponse() {

    }
}
