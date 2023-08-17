package com.threeracha.gaewoonhae.db.domain;
import javax.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;


@NoArgsConstructor //기본 생성자 만들어줌
@AllArgsConstructor //여기에 필드에 쓴 모든생성자만 만들어줌
@DynamicUpdate //update 할때 실제 값이 변경됨 컬럼으로만 update 쿼리를 만듬
@Entity //JPA Entity 임을 명시
@Getter //Lombok 어노테이션으로 getter
@Setter //Lombok 어노테이션으로 setter
@ToString
@Table(name = "user_buy_emoji_tbl") //테이블 관련 설정 어노테이션
public class UserBuyEmoji {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "buy_id")
    private Long buyId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne
    @JoinColumn(name = "emoji_id")
    private Emoji emoji;

    @Builder
    public UserBuyEmoji(User user, Emoji emoji){
        this.user=user;
        this.emoji=emoji;
    }

}
