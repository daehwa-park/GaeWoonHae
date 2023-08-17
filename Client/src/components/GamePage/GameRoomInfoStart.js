import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./GameRoomInfo.css";
import { roomActions } from "../../redux/reducer/roomInfoReducer";

const GameRoomInfoStart = ({ userList, refUserList }) => {
  const dispatch = useDispatch();

  const hostName = useSelector((state) => state.roomInfo.hostName);
  const myName = useSelector((state) => state.auth.user.nickname);
  const [roomUser, setRoomUser] = useState(0);
  // 오류 방지용 콘솔
  console.log(hostName, myName);
  const [limitTime, setLimitTime] = useState(60); // 초기 제한 시간은 30초로 설정합니다.
  const [isSelecting, setIsSelecting] = useState(false);
  const timeOptions = [30, 60, 90, 150, 180];
  const saveTime = () => {
    dispatch(roomActions.getLimitTime({ limitTime }));
  };
  const handleEnter = () => {
    setIsSelecting(true);
  };
  const handleLeave = () => {
    setIsSelecting(false);
  };

  const handleChange = (e) => {
    setLimitTime(e.target.value);
    setIsSelecting(false);
  };

  // const refreshList = async () => {
  //   setRoomUser(roomUser + 1);
  //   console.log(userList);
  // };
  // let changeUsers = useRef([]);
  useEffect(() => {
    console.log("게임인포 유저리스트", userList);
    // changeUsers.current = userList;
    let users = [...userList];
    setRoomUser(users);
    saveTime();
    // console.log(refUserList.current);
    // console.log("ref", changeUsers.current);
  }, [userList, limitTime]);
  return (
    <div className="game-room-info-start">
      <div className="count-people">
        <div>
          <h3>현재 인원 수</h3>
        </div>
        <div>{userList.length} / 5</div>
      </div>

      <div className="card-list">
        {userList.map((person, idx) =>
          person.username === hostName ? (
            // <div key={idx} className="user-card">
            //   {person.username} <div>🌟</div>
            // </div>
       
              <div key={idx} className="user-card">
                {person.username} <div key={idx}>🌟</div>
              </div>
              
    
          ) : (
            <div key={idx} className="user-card">
              {person.username}
            </div>
          )
        )}

      </div>

      {/* <div className="setting-emoji">이모지 변경하기</div> */}

      {hostName === myName && (
        <div
          className="time-setting-btn"
          onMouseOver={handleEnter}
          onMouseLeave={handleLeave}
        >
          {!isSelecting ? (
            `시간 제한 : ${limitTime}초`
          ) : (
            <select
              className="time-select"
              value={limitTime}
              onChange={handleChange}
              onBlur={() => setIsSelecting(false)}
            >
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}초
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {/* <button onClick={() => refreshList()} >refresh</button> */}
    </div>
  );
};

export default GameRoomInfoStart;