import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';

// opencv+canvas
import Webcam from "react-webcam";
import { loadHaarFaceModels, detectHaarFace } from "../../features/openvidu_opencv/opencv/haarFaceDetection";  // 얼굴인식 컴포넌트
import cv from "@techstark/opencv-js";
import {Link} from 'react-router-dom'
// 게임페이지2 - 픽토그램

const GamePage = (props) => {

    const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://i9b303.p.ssafy.io/' : 'https://demos.openvidu.io/';

    const [mySessionId, setMySessionId] = useState(props.sessionId);
    const [myUserName, setMyUserName] = useState(props.nickname);
    const [session, setSession] = useState(undefined);
    const [mainStreamManager, setMainStreamManager] = useState(undefined);
    const [publisher, setPublisher] = useState(undefined);
    const [subscriber, setSubscriber] = useState([]);

    const webcamRef = useRef();
    const imgRef = useRef();
    const faceImgRef = useRef();
    const emoji = useRef();







    return (
        <div>
 
        </div>
    )
}

export default GamePage