import React, { useEffect, useState, useRef } from "react";

import "./Lobby1.css";
import { Container, Row, Col, Card } from "react-bootstrap/";
import { useSelector } from "react-redux/es/hooks/useSelector";

import Chatting from "../../features/chatting/Chatting";
import GameRoomInfoStart from "../../components/GamePage/GameRoomInfoStart";
import logo from "../../assets/img/mainlogo.png";
import LimitTime from "../../components/GamePage/LimitTime";
// 대기방 - 박 터트리기

import emoji1 from "../../assets/emoji/emoji1.png";
import Webcam from "react-webcam";
import {
  loadHaarFaceModels,
  detectHaarFace,
} from "../../features/openvidu_opencv/opencv/haarFaceDetection"; // 얼굴인식 컴포넌트
import cv from "@techstark/opencv-js";

const Lobby = () => {

  const webcamRef = useRef();
  const imgRef = useRef();
  const faceImgRef = useRef();
  const emoji = useRef();
  const selectedEmojiRef = useRef(emoji1);
  const stopVideo = useRef(false);
    // 언마운트시에 비디오 종료
    const onUnmount = () => {
      stopVideo.current = true
      console.log('언마운트 성공')
    }
  
    // 이모지 리스트 서버에 요청
    useEffect(() => {
      init();
  
      return onUnmount  
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    const init = async () => {
      await loadHaarFaceModels(); //opencv : 학습 데이터 import
      nextTick();
      console.log("init실행")
    };
  
    const nextTick = () => {
      detectFace(); // 2번함수 실행
      if (!stopVideo.current) {
        requestAnimationFrame(async () => {
          nextTick(); // 반복
        })
      } else {
        console.log('종료',stopVideo.current)
      }
    };
  
    const detectFace = () => {
      if (!webcamRef.current) return;
      const imageSrc = webcamRef.current.getScreenshot(); // 웹캠 화면 캡쳐
      if (!imageSrc) return;
  
      return new Promise((resolve) => {
        imgRef.current.src = imageSrc;
        imgRef.current.onload = async () => {
          try {
            const img = cv.imread(imgRef.current);
  
            if (selectedEmojiRef.current !== null) {
              emoji.current.src = selectedEmojiRef.current; // 이모지
              const emo = cv.imread(emoji.current);
  
              detectHaarFace(img, emo); // opencv : loadHaarFaceModels()로 화면인식을 학습 => 포인트에 이모지 씌우기
            }
            cv.imshow(faceImgRef.current, img);
  
            img.delete(); // 이미지 초기화
            resolve();
          } catch (error) {
            console.log(error, "detectFace() 에러");
            resolve();
          }
        };
      });
    };
  
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
              <div className="emoji-video">
              <img className="inputImage" alt="input" ref={imgRef} style={{ display: "none" }} />
              <canvas
                id="canvas1"
                className="outputImage"
                ref={faceImgRef}
                style={{ width: "480px", borderRadius: "10px" }}
                
              />
              <img className="emoji" alt="input" ref={emoji} style={{ display: "none" }}></img>
              <Webcam
                ref={webcamRef}
                className="webcam"
                mirrored
                screenshotFormat="image/jpeg"
                style={{ width: "480px", visibility: "hidden" ,display:"flex", position:"absolute" }}
              />
            </div>
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