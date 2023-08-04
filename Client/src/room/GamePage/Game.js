import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux/es/hooks/useSelector"

// components
// import JumpingJack from '../../components/GamePage/games/jumpingjack/JumpingJack';
import UserVideoComponent from '../../features/openvidu_opencv/openvidu/UserVideoComponent';

// opencv+canvas
import Webcam from "react-webcam";
import { OpenVidu } from 'openvidu-browser';
import { loadHaarFaceModels, detectHaarFace } from "../../features/openvidu_opencv/opencv/haarFaceDetection";  // 얼굴인식 컴포넌트
import cv from "@techstark/opencv-js";

// openvidu



// 게임페이지

const GamePage = () => {

    const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://i9b303.p.ssafy.io/' : 'https://demos.openvidu.io/';
    const hostName = useSelector((state) => state.roomInfo.hostName);
    // const myName = useSelector((state) => state.auth.user.nickname);
    const myName = "김철수";
    // const sessionId = useSelector((state) => state.roomInfo.sessionId);
    const sessionId = "randomSessionA";
    const gameType = useSelector((state) => state.roomInfo.gameType);
    const limitTime = useSelector((state) => state.roomInfo.limitTime);

    const [session, setSession] = useState();
    const [mainStreamManager, setMainStreamManager] = useState();
    const [publisher, setPublisher] = useState();
    const [subscriber, setSubscriber] = useState([]);
    const [currentVideoDevice, setCurrentVideoDevice] = useState();
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);

    const webcamRef = useRef();

    let OV;
    const gameProps ={
        count,
        setCount,
        limitTime,
        started,
        setStarted,
        finished,
        setFinished
    }

    useEffect(async () => {

        // music.currentTime = 0;

        if (sessionId === '') {
            // send page to error
        }
        await startVideo();
        joinSession();
    },[])

    async function startVideo() {
        const video = document.getElementById('video1');
        console.log(video);
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          video.srcObject = stream;
        } catch (err) {
          console.error('비디오 스트림을 가져오는데 실패하였습니다.', err);
        }
      }

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

    const subscriberLeave = (streamManager) => {
        let remainSubscriber = subscriber;
        let index = remainSubscriber.indexOf(streamManager, 0);
        if (index >= 0) {
            remainSubscriber.splice(index, 1);
            setSubscriber(remainSubscriber);
        }
    }

    const joinSession = () => {
        OV = new OpenVidu();
        setSession(OV.initSession());
    }

    useEffect(() => {
        console.log("session useEffect occured");
        console.log(session);
        if (session) {

            let mySession = session;

            mySession.on('streamCreated', (event) => {
                let sessionSubscriber = mySession.subscribe(event.stream, undefined);
                let newSubscriber = subscriber;
                newSubscriber.push(sessionSubscriber);
                setSubscriber(newSubscriber);
            });

            mySession.on('streamDestoryed', (event) => {
                subscriberLeave(event.stream.streamManager);
            });

            mySession.on('exception', (e) => {
                console.warn(e); 
            })

            getToken()
                .then((token) => {
                    mySession.connect(token, {clientData: myName});
                })
                .then(async () => {

                    console.log("session connect completed")


                    let publisher = await OV.initPubliserAsync(undefined, {
                        audioSource : undefined,
                        videoSource : undefined,
                        publishAudio : true, 
                        publishVideo : true, 
                        resolution : '320x240',                                          // 해상도
                        frameRate : 24,                                                       // 프레임
                        insertMode : 'APPEND', 
                        mirror : false, 
                    })

                    console.log("publisher object completed")
                    
                    mySession.publish(publisher);
                    
                    console.log("publish object completed")
                    

                })
                .catch((error) => {
                    console.log('There was an error connecting to the session:', error);
                });
        }
    },[session])


    const leaveSession = () => {
        const mySession = session;

        if (mySession) {
            mySession.disconnect();
        }

        OV = null;
        setSession(undefined);
        setSubscriber([]);
        setMainStreamManager(undefined);
        setPublisher(undefined);

    }

    const switchCamera = async () => {
        try {
            const devices = await OV.getDevices();
            let videoDevices = devices.filter(device => device.kind === 'videoinput');

            if (videoDevices && videoDevices.length > 1) {
                let newVideoDevice = videoDevices.filter(device => device.deviceId !== currentVideoDevice.deviceId);

                if (newVideoDevice.length > 0) {
                    let newPublisher = OV.initPublisher(undefined, {                   //새로운 비디오 소스를 가진 새로운 출판자 객체(newPublisher)를 생성
                        videoSource: newVideoDevice[0].deviceId,
                        publishAudio: true,
                        publishVideo: true,
                        mirror: true
                    });

                    await session.unpublish(mainStreamManager);
                    await session.publish(newPublisher);

                    setCurrentVideoDevice(newVideoDevice[0]);
                    setMainStreamManager(newPublisher);
                    setPublisher(newPublisher);

                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    // 토큰 생성+ 세션생성+ 토큰 획득
    async function getToken() {
        const apiSessionId = await createSession(sessionId);
        return await createToken(apiSessionId);
    }

    async function createSession(sessionId) {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data; 
    }

    async function createToken(sessionId) {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data; 
    }

    return (
        // <div>
        //     {/* 네비 */}
        //     {/* 내 운동 화면 */}
        //     {/* 게임 종류별 컴포넌트 */}
        //     {/* ex) <JumpingJack props={} /> */}
        //     {/* for i in 4  */}
        //     {/*     다른사람 화면 */}
        // </div>

        <div id="video-container" style={{ display:"flex"}}>
            <div id="main-videos" style={{ flex:"1 0 60%" }}>
                {mainStreamManager !== undefined ? (
                    <div id="main-video" >
                        <video id='video1' autoPlay />
                        {/* <JumpingJack {...gameProps} /> */}
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default GamePage