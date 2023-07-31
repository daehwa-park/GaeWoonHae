package com.threeracha.gaewoonhae.db.domain;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@NoArgsConstructor //기본 생성자
@AllArgsConstructor
@DynamicUpdate
@Entity
@Getter
@Setter
@ToString
@Table(name = "game_type_tbl")
public class GameType {

    @Id
    @Column(name = "game_type")
    private Integer gameType;

    @Column(name="time_limit", nullable = false)
    private int timeLimit;

    @Column(name="game_name", nullable = false)
    private String gameName;

}
