import React, { useEffect, useState } from "react";

import "./Lobby1.css";
import { Container, Row, Col, Card } from "react-bootstrap/";
import { useSelector } from "react-redux/es/hooks/useSelector";

import Chatting from "../../features/chatting/Chatting";
import GameRoomInfoStart from "../../components/GamePage/GameRoomInfoStart";
import logo from "../../assets/img/mainlogo.png";

import LimitTime from "../../components/GamePage/LimitTime";
// 대기방 - 박 터트리기

const Lobby = () => {
  const gameNameList = [
    "터트려요 추억의 박!",
    "따라해요 픽토그램!",
    "피해봐요, 오늘의 X!",
  ];

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    console.log("나 유저리스트야", userList);
  }, [userList]);

  const gameType = useSelector((state) => state.roomInfo.gameType);
  const sessionId = useSelector((state) => state.roomInfo.sessionId);
  const gameName = gameNameList[gameType - 1];

  return (
    <div className="lobby-body">
      <div className="navbar-lobby">
        <img className="main-hover" src={logo} alt="" />
      </div>
      <div className="lobby-main">
        <Container>
          <Row className="title-row">
            <Col className="title-box">
              <h1>{gameName}</h1>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="chat-col">
              <Chatting setUserList={setUserList} />
            </Col>
            <Col md={6} className="video-col">
              <Row>
                <video
                  id="videoElement"
                  width="640"
                  height="480"
                  autoPlay
                  style={{ display: "none" }}
                ></video>
                <canvas id="canvas"></canvas>
              </Row>
              <Row className="text-center">
                <Col className="invite-time-container">
                  <Card bg="light" style={{ width: "18rem" }}>
                    <Card.Header>초대코드</Card.Header>
                    <Card.Body>
                      <Card.Title>{sessionId}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="invite-time-container">
                  <LimitTime />
                </Col>
              </Row>
            </Col>
            <Col md={3} className="game-col">
              {/* <div>{userList && userList[0].username}</div> */}
              <GameRoomInfoStart userList={userList} gameType={gameType} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Lobby;