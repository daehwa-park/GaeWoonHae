import React, { useEffect, useState } from "react";

import "./Chatting.css";
import { Form, Button } from "react-bootstrap/";
import { chattingAction } from "../Actions/chattingAction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Chatting = ({ setModalOpen, setUserList, updateUserList }) => {
  const gameType = useSelector((state) => state.roomInfo.gameType);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hostName = useSelector((state) => state.roomInfo.hostName);
  const myName = useSelector((state) => state.auth.user.nickname);
  const sessionId = useSelector((state) => state.roomInfo.sessionId);
  const limitTime = useSelector((state) => state.roomInfo.limitTime);
  const userId = useSelector((state) => state.auth.user.userId);
  const [chatMessage, setChatMessage] = useState(""); // 입력받은 채팅메세지를 저장하는 state입니다.

  const handleInputChange = (e) => {
    setChatMessage(e.target.value); // 채팅 메세지가 입력되면 state를 갱신합니다.
  };

  const handleLeaveRoom = () => {
    navigate("/main");
  };
  const updateUser = (userlist) => {
    console.log("dis", userlist);
    updateUserList(userlist);
  }


  const saveStompClient = () => {
    dispatch(
      chattingAction.getStompClient(
        setModalOpen,
        hostName,
        sessionId,
        myName,
        setUserList,
        updateUser,
        navigate,
        gameType,
        limitTime,
        userId
      )
    );
  };
  const handleSend = () => {
    console.log(chatMessage);

    // 채팅을 보낸 후 입력창을 초기화
    setChatMessage("");
  };

  useEffect(() => {
    saveStompClient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* <div className="chat-box">
        <div className="chat-top-bar">
          <span className="chat-room-title">{gameType===1 ? <div>모기잡이방</div> : <div>픽토그램방</div>}</span>
        </div>
  
          <div className="table chat-msg">
            <div id="messages"></div>
          </div>

        <Form className="chat-input-form">
          <div>
            <Form.Control
              type="text"
              // id="chat"
              value={chatMessage}
              className="chat-input"
              placeholder="채팅 입력"
              onChange={handleInputChange}
            />
          </div>
          <div className="chatsendbtn mx-0">
            <button
              // id="send"
              className="send-btn"
              type="submit"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </Form>
      </div> */}
      
      <div className="chat-box">
        <div className="chat-top-bar">
          <span className="chat-room-title">{gameType===1 ? <div>모기잡이방</div> : <div>픽토그램방</div>}</span>
        </div>
        <div className="message-container">
          <div id="messages" className="message-list">
            {/* 여기에 메시지를 렌더링하세요 */}
          </div>
        </div>
      <Form className="chat-input-form">
        <Form.Control
          type="text"
          id="chat"
          value={chatMessage}
          className="chat-input"
          placeholder="채팅 입력"
          onChange={handleInputChange}
        />
        <button
          id="send"
          className="send-btn"
          variant="primary"
          type="submit"
          onClick={handleSend}
        >
          Send
        </button>

      </Form>
      </div>
      
      
      
      <Form>
        {hostName === myName && (
          <button
            id="gameStart"
            className="gamestart-btn"
            variant="primary"
            type="submit"
          >
            게임 시작
          </button>
        )}
        <button
          id="leaveRoom"
          className="leave-room-btn"
          type="button"
          onClick={() => {
            handleLeaveRoom();
          }}
        >
          방나가기
        </button>
      </Form>
      <div className="user-info" id="result"></div>
    </div>
  );
};

export default Chatting;