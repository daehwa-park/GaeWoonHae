// 채팅 기능

import React, { useEffect } from "react";

import "./Chatting.css";
import { Form, Button } from "react-bootstrap/";
import { chattingAction } from "../Actions/chattingAction";
import { useSelector, useDispatch } from "react-redux";

const Chatting = ({ setUserList }) => {
  const dispatch = useDispatch();
  const hostName = useSelector((state) => state.roomInfo.hostName);
  const myName = useSelector((state) => state.auth.user.nickname);
  const sessionId = useSelector((state) => state.roomInfo.sessionId);

  const saveStompClient = () => {
    dispatch(
      chattingAction.getStompClient(hostName, sessionId, myName, setUserList)
    );
  };

  useEffect(() => {
    saveStompClient();
  });  // 수정

  return (
    <div>
      <div className="chat-box">
        <table className="table">
          <tbody id="messages"></tbody>
        </table>
      </div>
      <Form className="chat-input-form">
        <Form.Control
          type="text"
          id="chat"
          className="chat-input"
          placeholder="채팅 입력"
        />
        <Button id="send" className="send-btn" variant="primary" type="submit">
          Send
        </Button>
      </Form>
      <div className="user-info" id="result"></div>
    </div>
  );
};

export default Chatting;