import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./GameRoomInfo.css";

const GameRoomInfoStart = ({ userList, refUserList }) => {
  const hostName = useSelector((state) => state.roomInfo.hostName);
  const myName = useSelector((state) => state.auth.user.nickname);
  const [roomUser, setRoomUser] = useState(0);
  // 오류 방지용 콘솔
  console.log(hostName, myName);

  const refreshList = async () => { 
    setRoomUser(roomUser + 1);
    console.log(userList);
  };
  // let changeUsers = useRef([]);
  useEffect(() => {
    console.log("게임인포 유저리스트", userList);
    // changeUsers.current = userList;
    let users = [...userList];
    setRoomUser(users);
    // console.log(refUserList.current);
    // console.log("ref", changeUsers.current);
  }, [userList]);
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
            <div key={idx} className="user-card">
              {person.username}{" "}
              🌟
            </div>
          ) : (
            <div key={idx} className="user-card">
              {person.username}
            </div>
          )
        )}
      </div>

      <button onClick={() => refreshList()}>refresh</button>
    </div>
  );
};

export default GameRoomInfoStart;