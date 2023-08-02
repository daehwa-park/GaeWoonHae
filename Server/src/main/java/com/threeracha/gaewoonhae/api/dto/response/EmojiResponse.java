package com.threeracha.gaewoonhae.api.dto.response;

import com.threeracha.gaewoonhae.db.domain.Emoji;
import com.threeracha.gaewoonhae.db.domain.User;
import com.threeracha.gaewoonhae.utils.oauth.enums.OAuthProvider;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

@Getter
@Setter
public class EmojiResponse {
    long emojiId;
    int emojiPrice;

    public EmojiResponse(Emoji emoji) {
        this.emojiId = emoji.getEmojiId();
        this.emojiPrice = emoji.getEmojiPrice();
    }

}