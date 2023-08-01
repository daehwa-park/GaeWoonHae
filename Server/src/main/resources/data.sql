insert into game_type_tbl values(1,"픽토그램",3);

insert into emoji_tbl values(1,300);
insert into emoji_tbl values(2,100);
insert into emoji_tbl values(3,500);

insert into user_tbl values(1,"ewqe@qwe","난유저야","KAKAO",100,"refresh_token",1);
insert into room_tbl values("session_id_asd",1,'Y',5,'R',1,1);
insert into record_tbl values(1, 10, "2023-7-31 13:26:50", 1, 1);

insert into user_buy_emoji_tbl (buy_id, emoji_id, user_id) values(12, 1, 1);
insert into user_buy_emoji_tbl (buy_id, emoji_id, user_id) values(13, 2, 1);

insert into point_history_tbl (user_id, point_change, change_time) values(1,-20,"1998.10.11");
insert into point_history_tbl (user_id, point_change, change_time) values(1,-30,"1998.10.12.00:00")