import React, { useEffect, useState, useRef } from "react";

import "./Lobby1.css";
import { Container, Row, Col, Card } from "react-bootstrap/";
import { useSelector } from "react-redux/es/hooks/useSelector";
import LobbyClose from "../../components/modal/LobbyClose";
import Chatting from "../../features/chatting/Chatting";
import GameRoomInfoStart from "../../components/GamePage/GameRoomInfoStart";
import logo from "../../assets/img/purple_logo.png";
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
  const useremojiId = useSelector(state => state.auth.user.emojiId);

  const [modalOpen, setModalOpen] = useState(false);

  const webcamRef = useRef();
  const imgRef = useRef();
  const faceImgRef = useRef();
  const emoji = useRef();
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

            if(useremojiId !== 11){
              emoji.current.src = `../../images/emoji/emoji${useremojiId}.png`; // 이모지
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
    "짝짝! 모기 잡아라!!",
    "도전! 픽토그램!",
  ];


  const [num, setNum] = useState(0);
  const [userList, setUserList] = useState([]);
  const refUserList = useRef([]);

  useEffect(() => {
    console.log("나 유저리스트야", refUserList.current);
  }, [refUserList.current]);

  const gameType = useSelector((state) => state.roomInfo.gameType);
  const sessionId = useSelector((state) => state.roomInfo.sessionId);
  const gameName = gameNameList[gameType - 1];

  const updateUserList = (userlist) => {
    refUserList.current = userlist;
    console.log(refUserList.current, "lobbyupdate");
    plusOne();
  }

  const plusOne = () => {    
    setNum(prev => prev + 1);
  }
  const [showCode, setShowCode] = useState(false);

  const handleMouseEnter = () => {
    setShowCode(true);
  };

  const handleMouseLeave = () => {
    setShowCode(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(sessionId);
    alert("초대코드가 복사되었습니다!");
    setShowCode(false);
  };
  return (
    <div className="lobby-body">
    <div className="navbar-lobby">
      <img className="main-hover" src={logo} alt="" />
      <div
        className={`invitation-code ${showCode ? "hovered" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showCode ? (
          <>
            {sessionId}{" "}
            <button className="code-copy" onClick={handleCopy}>
              Copy
            </button>
          </>
        ) : (
          "초대코드"
        )}
      </div>
    </div>
      <div className="lobby-main">
      {modalOpen && (<LobbyClose setModalOpen={setModalOpen}/>)}
        <Container>
          <Row className="title-row">
            <Col className="title-box">
              <h1>{gameName}</h1>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="chat-col">
              <Chatting setModalOpen={setModalOpen} setUserList={setUserList} updateUserList={updateUserList} />
            </Col>
            <Col md={6} className="video-col">
              <Row>
              <div className="emoji-video">
              <img className="inputImage" alt="input" ref={imgRef} style={{ display: "none" }} />
              <canvas
                id="canvas1"
                className="outputImage"
                ref={faceImgRef}
                style={{ width: "95%", borderRadius: "10px", marginLeft: "3%" }}
                
              />
              <img className="emoji" alt="input" ref={emoji} style={{ display: "none" }}></img>
              <Webcam
                ref={webcamRef}
                className="webcam"
                mirrored
                screenshotFormat="image/jpeg"
                style={{ width: "360px", visibility: "hidden" ,display:"flex", position:"absolute" }}
              />
            </div>
              </Row>
              {/* <Row className="text-center">
                <Col className="invite-time-container">
                  <Card bg="light">
                    <Card.Header
                      className="card-head"
                      style={{ backgroundColor: "#e6e6fa" }}
                    >
                      초대코드
                    </Card.Header>
                    <Card.Body className="card-body">{sessionId}</Card.Body>
                  </Card>
                </Col>
                <Col className="invite-time-container">
                  <LimitTime/>
                </Col>
              </Row> */}
            </Col>
            <Col md={3} className="game-col">
              {/* <div>{userList && userList[0].username}</div> */}
              <GameRoomInfoStart
                userList={userList}
                refUserList={refUserList}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Lobby;