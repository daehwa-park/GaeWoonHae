package com.threeracha.gaewoonhae.db.domain;
import com.threeracha.gaewoonhae.utils.oauth.enums.OAuthProvider;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import javax.persistence.*;

@NoArgsConstructor //기본 생성자 만들어줌
@AllArgsConstructor //여기에 필드에 쓴 모든생성자만 만들어줌
@DynamicUpdate //update 할때 실제 값이 변경됨 컬럼으로만 update 쿼리를 만듬
@Entity //JPA Entity 임을 명시
@Getter //Lombok 어노테이션으로 getter
@Setter //Lombok 어노테이션으로 setter
@Table(name = "user_tbl") //테이블 관련 설정 어노테이션
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long userId;

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "oauth_provider")
    @Enumerated(EnumType.STRING)
    private OAuthProvider oAuthProvider;

    @Column(name = "refresh_token", nullable = true)
    private String refreshToken;

    @Builder
    public User(String email, String nickname, OAuthProvider oAuthProvider) {
        this.email = email;
        this.nickname = nickname;
        this.oAuthProvider = oAuthProvider;
    }

}
