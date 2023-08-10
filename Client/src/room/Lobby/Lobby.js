import React, { useEffect, useState } from "react";

import "./Lobby1.css";
import { Container, Row, Col, Card } from "react-bootstrap/";
import { useSelector } from "react-redux/es/hooks/useSelector";

import { roomActions } from "../../redux/reducer/roomInfoReducer";
import Chatting from "../../features/chatting/Chatting";
import GameRoomInfoStart from "../../components/GamePage/GameRoomInfoStart";
import logo from "../../assets/img/mainlogo.png";
import { useDispatch } from "react-redux";
// 대기방 - 박 터트리기

const Lobby = () => {
  const gameNameList = [
    "터트려요 추억의 박!",
    "따라해요 픽토그램!",
    "피해봐요, 오늘의 X!",
  ];
  const dispatch = useDispatch();
  const [limitTime, setLimitTime] = useState(60);
  const [userList, setUserList] = useState([]);
  const saveTime = () => {
    dispatch(roomActions.getLimitTime({ limitTime }));
  };
  useEffect(() => {
    console.log("나 유저리스트야", userList);
  }, [userList]);
  useEffect(() => {
    console.log("제한시간이양", limitTime);
    saveTime();
  }, [limitTime]);

  const gameType = useSelector((state) => state.roomInfo.gameType);
  const sessionId = useSelector((state) => state.roomInfo.sessionId);
  const gameName = gameNameList[gameType - 1];
  const handleTimeChange = (event) => {
    setLimitTime(Number(event.target.value)); // 선택된 값을 timeSecond로 설정
  };

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
              <Chatting setUserList={setUserList} limitTime={limitTime} />
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
                  <Card bg="light" style={{ width: "18rem" }}>
                    <Card.Header>제한 시간</Card.Header>
                    <Card.Body>
                      <Card.Title>
                        <Row className="text-center">
                          <Col lg={8}>{limitTime} 초</Col>
                          <Col lg={4}>
                            <select name="time" onChange={handleTimeChange}>
                              <option value={60}>60</option>
                              <option value={90}>90</option>
                              <option value={120}>120</option>
                              <option value={150}>150</option>
                            </select>
                          </Col>
                        </Row>
                      </Card.Title>
                    </Card.Body>
                  </Card>
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
