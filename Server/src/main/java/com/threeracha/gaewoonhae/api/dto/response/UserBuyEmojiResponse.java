package com.threeracha.gaewoonhae.api.dto.response;

import com.threeracha.gaewoonhae.db.domain.UserBuyEmoji;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserBuyEmojiResponse {
    long userId;
    long emojiId;

    public UserBuyEmojiResponse(UserBuyEmoji userBuyEmoji) {
        this.userId = userBuyEmoji.getUser().getUserId();
        //this.emojiId = userBuyEmoji.getEmojiEmojiId();
    }

}
