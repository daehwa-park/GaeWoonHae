import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux/es/hooks/useSelector"

// components
// import MyGameScreen from '../../components/GamePage/games/MyGameScreen';
import UserVideoComponent from '../../features/openvidu_opencv/openvidu/UserVideoComponent';

// opencv+canvas
import Webcam from "react-webcam";
import { loadHaarFaceModels, detectHaarFace } from "../../features/openvidu_opencv/opencv/haarFaceDetection";  // 얼굴인식 컴포넌트
import cv from "@techstark/opencv-js";

// openvidu
import { OpenVidu } from 'openvidu-browser';

// stomp
import SockJS from "sockjs-client"
import Stomp from "stompjs"
import GameLoader from '../../components/GamePage/games/GameLoader';


// 게임페이지

const GamePage = () => {

    const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://i9b303.p.ssafy.io/' : 'https://demos.openvidu.io/';
    const hostName = useSelector((state) => state.roomInfo.hostName);
    const myName = useSelector((state) => state.auth.user.nickname);
    const sessionId = useSelector((state) => state.roomInfo.sessionId);
    const gameType = useSelector((state) => state.roomInfo.gameType);
    const limitTime = useSelector((state) => state.roomInfo.limitTime);
    // const emoji = useSelector((state) => state.user.emoji);

    // openvidu states
    const [session, setSession] = useState();
    const [mainStreamManager, setMainStreamManager] = useState();
    const [publisher, setPublisher] = useState();
    const [subscriber, setSubscriber] = useState([]);
    const [currentVideoDevice, setCurrentVideoDevice] = useState();
    const [openViduLoad, setOpenViduLoad] = useState(false);

    // stomp state
    const [stompClient, setStompClient] = useState();
    const [stompLoad, setStompLoad] = useState(false);

    // game states
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [gameLoad, setGameLoad] = useState(false);
    const [assetLoad, setAssetLoad] = useState(true);
    const [userList, setUserList] = useState([
        {username: "정원", count: 0}, 
        {username: "김두현", count: 0}, 
        {username: "수빈", count: 0}, 
        {username: "우승빈", count: 0}, 
        {username: "양준영", count: 0}
    ]);

    // refs for openCV
    const webcamRef = useRef();
    const imgRef = useRef();
    const faceImgRef = useRef();
    const emojiRef = useRef();

    // openVidu Object
    let OV;

    // commonProps
    const gameProps ={
        count,
        setCount,
        started,
        setStarted,
        finished,
        setFinished,
        limitTime,
        setGameLoad,
        gameType
    }


    // openCV Settings

    const updateEmoji = async () => {
        detectFace();
        requestAnimationFrame(updateEmoji);
    }

    const detectFace = () => {

        const imageSrc = webcamRef.current.getScreenshot();

        if (!imageSrc) return;

        return new Promise((resolve) => {
            imgRef.current.src = imageSrc;
            imgRef.current.onload = async () => {
                try {
                    const img = cv.imread(imgRef.current);
                    const emo = cv.imread(emojiRef.current)
                    detectHaarFace(img,emo);    // opencv : loadHaarFaceModels()로 화면인식을 학습 => 포인트에 이모지 씌우기

                    cv.imshow(faceImgRef.current, img);
                    img.delete();  // 이미지 초기화
                    resolve();
                } catch (error) {
                    console.log(error, 'detectFace() 에러');
                    resolve();
                }
            }
        })
    }


    // OpenVidu Settings

    const joinSession = () => {
        OV = new OpenVidu();

        let session = OV.initSession();

        if (session) {

            session.on('streamCreated', (event) => {
                let sessionSubscriber = session.subscribe(event.stream, undefined);
                let newSubscriber = subscriber;
                newSubscriber.push(sessionSubscriber);
                setSubscriber(newSubscriber);
            });

            session.on('streamDestoryed', (event) => {
                subscriberLeave(event.stream.streamManager);
            });

            session.on('exception', (e) => {
                console.warn(e); 
            })

            getToken()
                .then(async (token) => {
                    await session.connect(token, {clientData: myName});
                })
                .then(async () => {

                    const canvas = document.getElementById("canvas1")

                    let publisher = await OV.initPublisher(undefined, {
                        audioSource : undefined,
                        videoSource : canvas.captureStream().getVideoTracks()[0],
                        publishAudio : true, 
                        publishVideo : true, 
                        resolution : '320x240',
                        frameRate : 24,
                        insertMode : 'APPEND', 
                        mirror : false, 
                    })

                    session.publish(publisher);

                    setSession(session);
                    setMainStreamManager(publisher);
                    setPublisher(publisher);


                })
                .catch((error) => {
                    console.log('There was an error connecting to the session:', error);
                });
        }
    }

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
    
    const subscriberLeave = (streamManager) => {
        let remainSubscriber = subscriber;
        let index = remainSubscriber.indexOf(streamManager, 0);
        if (index >= 0) {
            remainSubscriber.splice(index, 1);
            setSubscriber(remainSubscriber);
        }
    }

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


    // Stomp Settings

    //stomp 연결
    const connectStomp = () => {
        var socket = new SockJS("/gwh-websocket");

        let stompClient = Stomp.over(socket);
        console.log(stompClient);

        var headers = {
            name: myName,
            roomNumber: sessionId,
        };

        stompClient.connect(headers, function (frame){ 
            stompClient.subscribe(
                // 게임정보 주고 받는 채널 구독
                "/topic/gameroom/" + sessionId + "/gameInfo",
                function (message) {
                    // {username: ? count: ?} 으로 변경된 정보가 날라옴. 받아온 정보로 표시되는 게임 정보 업데이트해야함
                    updateGameInfo(JSON.parse(message.body));
                } 
            );
        });
        setStompClient(stompClient);
    }

    const updateGameInfo = (gameInfo) => {
        // userList에서 닉네임 같은 놈 찾아서 카운트 바꾸고 반영
        const updateUserList = userList.map((user) => 
            user.username === gameInfo.username ? {
                ...user, count : gameInfo.count
            } : user
        );

        setUserList(updateUserList);
    }

    const gameInfoChange = () => {
        stompClient.send(
            "/app/gameroom/" + sessionId + "/gameInfo",{},
            // 내 정보를 해당 채널로 보내면 됨
            JSON.stringify({ username: myName, count: count})
        );
    }

    // useEffects

    useEffect(() => {

        const init = async () => {
            // music.currentTime = 0;

            if (sessionId === '') {
                // send page to error
            }

            emojiRef.current.src = `../../images/emoji/emoji2.png`
            await loadHaarFaceModels();
            updateEmoji();
            console.log("MODEL LOADED!!!!!!!!!!!!!!!!!!!!")

            joinSession();
            setOpenViduLoad(true);
            console.log("OPENVIDU CONNECTED!!!!!!!!!!!!")

            connectStomp();
            setStompLoad(true);
            console.log("STOMP CONNECTED!!!!!!!!!!!!!!")

        }

        init();
    },[])

    useEffect(() => {

        if (stompLoad && openViduLoad && gameLoad && assetLoad) {
            setStarted(true);
            console.log("GAME START!!!!!!!!!!!!!!!!!");
        }

    },[stompLoad, openViduLoad, gameLoad, assetLoad])

    // 게임 카운트 갱신
    useEffect(()=> {
        if (count != 0) {
            gameInfoChange();
        }

    },[count])


    // 게임 종료 신호
    // useEffect(() => {
    //     if (finished) {
    //         // 결과 전송 및 게임 결산
    //     }
    // },[finished])



    return (
        <div>
            <div style={{ width: "400px" ,visibility:"hidden" ,display:"flex", position:"absolute"}}>
                <Webcam
                        ref={webcamRef}
                        className="webcam"
                        mirrored
                        screenshotFormat="image/jpeg" />
                <canvas id="canvas1" className="outputImage" ref={faceImgRef} style={{display:'none'}}/>
                <img className="inputImage" alt="input" ref={imgRef} style={{display:'none' }}/>
                <img className="emoji" alt="input" ref={emojiRef} style={{display:'none'}} />
            </div>
            <GameLoader props={gameProps} />
            <UserVideoComponent streamManager={mainStreamManager} style={{width:"640px", height:"480px"}}/>
            <h2>성공한 횟수 : {count}</h2>
        </div>
    )
}

export default GamePage