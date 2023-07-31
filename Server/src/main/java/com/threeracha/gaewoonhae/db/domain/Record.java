package com.threeracha.gaewoonhae.db.domain;
import javax.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import java.util.Date;

@NoArgsConstructor //기본 생성자 만들어줌
@AllArgsConstructor //여기에 필드에 쓴 모든생성자만 만들어줌
@DynamicUpdate //update 할때 실제 값이 변경됨 컬럼으로만 update 쿼리를 만듬
@Entity //JPA Entity 임을 명시
@Getter //Lombok 어노테이션으로 getter
@Setter //Lombok 어노테이션으로 setter
@Table(name = "record_tbl") //테이블 관련 설정 어노테이션
public class Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_record_id")
    private Long gameRecordId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "game_type")
    private GameType gameType;

    @Column(name = "count", nullable = false)
    private int count;

    @Column(name = "record_date_time", nullable = false)
    private Date recordDateTime;

//    @Temporal(TemporalType.TIMESTAMP)
//    private Date changeTime;

}
