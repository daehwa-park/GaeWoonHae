import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import "./GameRoomInfo.css";

const GameRoomInfoStart = ({ userList }) => {
  const hostName = useSelector((state) => state.roomInfo.hostName);
  const myName = useSelector((state) => state.auth.user.nickname);
  useEffect(() => {
    console.log("게임인포 유저리스트", userList);
  }, [userList]);
  return (
    <div>
      <div>{userList.length} / 5</div>
      {userList.map((person, idx) => (
        <div key={idx}>{person.username}</div>
      ))}
    </div>
  );
};

export default GameRoomInfoStart;