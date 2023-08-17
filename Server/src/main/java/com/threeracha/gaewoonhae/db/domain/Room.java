package com.threeracha.gaewoonhae.db.domain;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;


@NoArgsConstructor //기본 생성자 만들어줌
//@RequiredArgsConstructor
@AllArgsConstructor //여기에 필드에 쓴 모든생성자만 만들어줌
@DynamicUpdate //update 할때 실제 값이 변경됨 컬럼으로만 update 쿼리를 만듬
@Entity //JPA Entity 임을 명시
@Getter //Lombok 어노테이션으로 getter
@Setter //Lombok 어노테이션으로 setter
@ToString
@Table(name = "room_tbl") //테이블 관련 설정 어노테이션
public class Room{

    @Id
    @Column(name = "session_id")
    private String sessionId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne
    @JoinColumn(name = "game_type")
    private GameType gameType;

    @Column(name = "current_user_num", nullable = false)
    private int currentUserNum;

    @Column(name = "limit_user_num", nullable = false)
    private int limitUserNum;

    @Column(name = "is_public_room", nullable = false)
    private char isPublicRoom;

    @Column(name = "room_status", nullable = false)
    private char roomStatus;


}
