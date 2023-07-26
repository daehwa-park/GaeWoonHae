package com.threeracha.gaewoonhae.db.domain;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import javax.persistence.*;


@NoArgsConstructor //기본 생성자 만들어줌
@AllArgsConstructor //여기에 필드에 쓴 모든생성자만 만들어줌
@DynamicUpdate //update 할때 실제 값이 변경됨 컬럼으로만 update 쿼리를 만듬
@Entity //JPA Entity 임을 명시
@Getter //Lombok 어노테이션으로 getter
@Setter //Lombok 어노테이션으로 setter
@ToString
@Table(name = "room_tbl") //테이블 관련 설정 어노테이션
public class Room{

    @Id @GeneratedValue
    @Column(name = "session_id")
    private String sessionId;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "current_user_num")
    private String currentUserNum;

    @Column(name = "limit_user_num")
    private String limitUserNum;

    @Column(name = "is_public_room")
    private int isPublicRoom;

    @Column(name = "admin")
    private int admin;

    @Column(name = "game_type")
    private int gameType;

    @Column(name = "time_limit")
    private int timeLimit;

}
