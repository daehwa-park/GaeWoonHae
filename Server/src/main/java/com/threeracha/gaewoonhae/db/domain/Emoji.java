package com.threeracha.gaewoonhae.db.domain;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@DynamicUpdate
@Entity
@Getter
@ToString
@Table(name="emoji_tbl")
public class Emoji {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="emoji_id")
    private Long emojiId;

    @Column(name="emoji_price", nullable = false)
    private int emojiPrice;



}
