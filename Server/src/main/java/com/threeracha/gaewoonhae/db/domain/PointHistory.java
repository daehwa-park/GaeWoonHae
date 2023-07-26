package com.threeracha.gaewoonhae.db.domain;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@NoArgsConstructor //기본 생성자 만들어줌
@AllArgsConstructor //여기에 필드에 쓴 모든생성자만 만들어줌
@DynamicUpdate //update 할때 실제 값이 변경됨 컬럼으로만 update 쿼리를 만듬
@Entity //JPA Entity 임을 명시
@Getter //Lombok 어노테이션으로 getter
@Setter //Lombok 어노테이션으로 setter
@ToString
@Table(name = "point_history_tbl") //테이블 관련 설정 어노테이션
public class PointHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Integer historyId;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "point_change", nullable = false)
    private Integer pointChange;

    @Column(name = "chang_time", nullable = false)
    private String changeTime;

//    @Temporal(TemporalType.TIMESTAMP)
//    private Date changeTime;
}
