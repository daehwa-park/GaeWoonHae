package com.threeracha.gaewoonhae.db.repository;

import com.threeracha.gaewoonhae.db.domain.Emoji;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmojiRepository extends JpaRepository<Emoji, Long> {
    //Optional<Emoji> findByEmojiIdAndEmojiPrice(int emojiId, int emojiPrice);

}
