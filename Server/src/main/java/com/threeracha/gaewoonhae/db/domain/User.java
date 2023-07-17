package com.threeracha.gaewoonhae.db.domain;



@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자 만들어줌
@DynamicUpdate //update 할때 실제 값이 변경됨 컬럼으로만 update 쿼리를 만듬
@Entity //JPA Entity 임을 명시
@Getter //Lombok 어노테이션으로 getter
@Setter //Lombok 어노테이션으로 setter
@Table(name = "user") //테이블 관련 설정 어노테이션
public class User {

    @User_id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int user_id;

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "refresh_token", nullable = false)
    private String refresh_token;



}
