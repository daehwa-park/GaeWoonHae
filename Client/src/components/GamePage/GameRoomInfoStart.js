// 로비 박스 우측 컴포넌트

import React from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { roomActions } from "../../redux/reducer/roomInfoReducer";
import "./GameRoomInfo.css";
// import { chattingAction } from "../../features/Actions/chattingAction";

const GameRoomInfoStart = ({ userList, gameType, setIsStart }) => {
  // const navigate = useNavigate();
  const hostName = useSelector((state) => state.roomInfo.hostName);
  const myName = useSelector((state) => state.auth.user.nickname);
  const dispatch = useDispatch();
  const saveUserList = (userList) => {
    dispatch(roomActions.getGameUserList({ userList }));
  };
  return (
    <div
      className="game-room-info-start"
      bg="purple"
      style={{ height: "100%" }}
    >
      <Card.Body className="d-flex flex-column justify-content-end">
        {hostName === myName && (
          <Button
            variant="light"
            onClick={async () => {
              if (userList.length === 1) {
                saveUserList(userList);
                setIsStart(true);
                // navigate(`/gamepage/${gameType}`);
              }
            }}
          >
            GameStart
          </Button>
        )}
      </Card.Body>
    </div>
  );
};

export default GameRoomInfoStart;
