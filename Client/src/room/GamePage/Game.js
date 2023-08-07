import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';

// opencv+canvas
import Webcam from "react-webcam";
import { loadHaarFaceModels, detectHaarFace } from "../../features/openvidu_opencv/opencv/haarFaceDetection";  // 얼굴인식 컴포넌트
import cv from "@techstark/opencv-js";
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux/es/hooks/useSelector"
import JumpingJack from '../../components/GamePage/games/JumpingJack';

// 게임페이지

const GamePage = () => {

    const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://i9b303.p.ssafy.io/' : 'https://demos.openvidu.io/';
    const hostName = useSelector((state) => state.roomInfo.hostName);
    const myName = useSelector((state) => state.auth.user.nickname);
    const sessionId = useSelector((state) => state.roomInfo.sessionId);
    const gameType = useSelector((state) => state.roomInfo.gameType);
    const limitTime = 0;

    const [mainStreamManager, setMainStreamManager] = useState(undefined);
    const [publisher, setPublisher] = useState(undefined);
    const [subscriber, setSubscriber] = useState([]);
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);

    const webcamRef = useRef();
    const imgRef = useRef();
    const faceImgRef = useRef();
    const emoji = useRef();

    useEffect(() => {

    },[])

    // OpenVidu, Stomp 커넥션 하세요
    
    // 게임 종료 신호
    useEffect(() => {
        if (finished) {
            // 결과 전송 및 게임 결산
        }
    },[finished])

    // 게임 카운트 갱신
    useEffect(()=> {
        // 소켓으로 자신의 카운트가 바뀐것을 다른사람에게 알림
    },[count])

    return (
        <div>
            {/* 네비 */}
            {/* 내 운동 화면 */}
            {/* 게임 종류별 컴포넌트 */}
            {/* ex) <JumpingJack props={} /> */}
            {/* for i in 4  */}
            {/*     다른사람 화면 */}
        </div>
    )
}

export default GamePage