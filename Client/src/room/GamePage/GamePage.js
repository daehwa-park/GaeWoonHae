import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from "react-redux/es/hooks/useSelector"
import './GamePage.css'
import GameEndBtn from "../../components/modal/gameEnd"

// components
import UserVideoComponent from '../../features/openvidu_opencv/openvidu/UserVideoComponent';
import CommonUI from '../../components/GamePage/games/CommonUI';
import GameLoader from '../../components/GamePage/games/GameLoader';

// opencv+canvas
import Webcam from "react-webcam";
import { loadHaarFaceModels, detectHaarFace } from "../../features/openvidu_opencv/opencv/haarFaceDetection";  // 얼굴인식 컴포넌트
import cv from "@techstark/opencv-js";

// openvidu
import { OpenVidu } from 'openvidu-browser';

// stomp
import SockJS from "sockjs-client"
import Stomp from "stompjs"
// import JumpingJack from '../../components/GamePage/games/ui/JumpingJack';
// import Pictogram from '../../components/GamePage/games/ui/Pictogram';
// import Squat from '../../components/GamePage/games/ui/Squat';
// 로딩창
import CountLoading from './countloading'
import Loading from './loading'

// 게임페이지

const GamePage = () => {

    // 게임 진행시간
    const gametime = 20;

    // 로딩 애니메이션(1.버스)
    // const loadingtime = 3000;  // 로딩시간 설정
    const [loading,setLoading] =useState(true);
    // 로딩 애니메이션(2.카운트 다운)
    const countdown = 5000;
    const [counting,setCounting] = useState(false);
    const loadcomplete = useRef(false);
    // 게임 종료 모달 
    const [GamemodalOpen, setGameModalOpen] = useState(false);

    const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://i9b303.p.ssafy.io/' : 'https://demos.openvidu.io/';
    // const hostName = useSelector((state) => state.roomInfo.hostName);
    const myName = useSelector((state) => state.auth.user.nickname);
    const sessionId = useSelector((state) => state.roomInfo.sessionId);
    const gameType = useSelector((state) => state.roomInfo.gameType);
    const limitTime = useSelector((state) => state.roomInfo.limitTime);
    // const emoji = useSelector((state) => state.user.emoji);
    const firstUserList = useSelector((state) => state.roomInfo.userList);

    // openvidu states
    const [session, setSession] = useState();
    const [mainStreamManager, setMainStreamManager] = useState();
    const [publisher, setPublisher] = useState();
    const [subscriber, setSubscriber] = useState([]);
    // const [currentVideoDevice, setCurrentVideoDevice] = useState();
    const [openViduLoad, setOpenViduLoad] = useState(false);

    // stomp state
    const [stompClient, setStompClient] = useState();
    const [stompLoad, setStompLoad] = useState(false);

    // game states
    const [count, setCount] = useState(0);
    const [timer, setTimer] = useState(0);
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [gameLoad, setGameLoad] = useState(false);
    const [assetLoad, setAssetLoad] = useState(true);
    const [userList, setUserList] = useState(firstUserList);
    const [renderingcount,setRenderingcount] = useState([0,1,2,3])

    // refs for openCV
    const webcamRef = useRef();
    const imgRef = useRef();
    const faceImgRef = useRef();
    const emojiRef = useRef();

    // 비디오 종료 조건
    const stopVideo = useRef(false);


    // openVidu Object
    let OV;

    // timer
    const timerIdRef = useRef(null);
    // let timerId;

    
    // 모달 입장
    // const showLobbyModal = () => {
    //     setGameModalOpen(true);
    // };



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

                    setOpenViduLoad(true);
                    console.log("OPENVIDU CONNECTED!!!!!!!!!!!!")

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
    //임시 사용
    console.log(publisher,setAssetLoad,setRenderingcount,leaveSession)
    
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
                "/topic/gameroom/" + sessionId + "/gameinfo",
                (message) => {
                    // {username: ? count: ?} 으로 변경된 정보가 날라옴. 받아온 정보로 표시되는 게임 정보 업데이트해야함
                    updateGameInfo(JSON.parse(message.body));
                }
            );
            setStompClient(stompClient);
            setStompLoad(true);
            console.log("STOMP CONNECTED!!!!!!!!!!!!!!")
        });

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
            "/app/gameroom/" + sessionId + "/gameinfo",{},
            // 내 정보를 해당 채널로 보내면 됨
            JSON.stringify({ username: myName, count: count})
        );
    }

    // 언마운트시에 비디오 종료
    const onUnmount = () => {
        stopVideo.current = true
        console.log('언마운트 성공')
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

            connectStomp();
        }

        init();
        return onUnmount  
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {

        if (stompLoad && openViduLoad && gameLoad && assetLoad) {
            setStarted(true);
            console.log("GAME START!!!!!!!!!!!!!!!!!");
        }

    },[stompLoad, openViduLoad, gameLoad, assetLoad])



    useEffect(() => {
        const startTimer = () => {
            if (timer < limitTime) {
                timerIdRef.current = setInterval(() => {
                    setTimer(prev => prev + 1);
                }, 1000)
            } else {
                setFinished(true);
            }
        }
        
        //로딩 조건
        if (started) {
            startTimer();
            setLoading(false);
            setCounting(true);
            // 로딩이 되었으면, 게임시간타이머에 전달
            loadcomplete.current=true
            
            // 버스 로딩 끝나고 => 3초 카운트 다운시작
            setTimeout(()=> {
                setCounting(false);
            }, countdown);

            // 버스 로딩,3초 카운트 끝나고 => 게임시간타이머 끝나고 나서 실행
            setTimeout(()=> {
                setGameModalOpen(true);
            }, countdown+gametime*1000+2000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [started])

    useEffect(() => {
        if (finished) {
            clearInterval(timerIdRef.current);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[finished])

    // 게임 카운트 갱신
    useEffect(()=> {
        if (count !== 0) {
            gameInfoChange();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[count])




    return (
        <div className='gamepage'>
            <div className="head">
                <span>l l l</span>
                <span className='Logo1'>게운해 </span>
                <span className='Logo2'>GAEWOONHAE</span>
            </div>
            <div className="mainscreen">
                {/* 로딩 애니메이션 */}
                {loading ? <Loading />:null }
                {counting ? <CountLoading countdown={countdown} /> : null}
                {/* 게임 종료 모달 */}
                {GamemodalOpen && (<GameEndBtn/>)}
                <div className='gametitle'>
                    <h1 className='titlename'>박 터트리기!!</h1>
                    <p >빠르고 정확한 동작으로 더 많이 박을 터트리세요!</p>
                    <hr />
                </div>
                <div className="gamescreen">
                    <div className='messagebtntag'>
                        {/* 채팅 모달창 */}
                            {/* <button className='messagebtn' onClick={showModal}>버튼</button>
                            {modalOpen && <ChatModal className='chatmodal' setModalOpen={setModalOpen} />} */}
                    </div>
                    <div className="mainvideo">
                        <div id="session">
                            {/* OpenCV용 Canvas (전부 invisible 시켜놓으면 됨) */}
                            <div style={{ width: "400px" ,visibility:"hidden" ,display:"flex", position:"absolute"}}>
                                <Webcam
                                        ref={webcamRef}
                                        className="webcam"
                                        mirrored
                                        screenshotFormat="image/jpeg" />
                                <canvas id="canvas1" className="outputImage" ref={faceImgRef} style={{visibility:"hidden"}}/>
                                <img className="inputImage" alt="input" ref={imgRef} style={{display:'none' }}/>
                                <img className="emoji" alt="input" ref={emojiRef} style={{display:'none'}} />
                            </div>
                            {/* 게임 로직 컴포넌트 (아무 배치요소 없음) */}
                            <GameLoader props={{setCount, started, finished, gameType, setGameLoad}} />
                                {/* 위에 게임별 이미지 UI
                                {gameType === 1 && <JumpingJack />}
                                {gameType === 2 && <Pictogram />}
                                {gameType === 3 && <Squat />} */}
                            <div id="video-container" style={{ display:"flex"}}>
                                {/* 내 화면 */}
                                <div id="main-videos" style={{ flex:"1 0 60%" }}>
                                    <div id="main-video" >
                                        <UserVideoComponent streamManager={mainStreamManager}/>
                                        {/* 위에 공통 UI */}
                                        <CommonUI props={{count, timer, userList, countdown,loadcomplete, gametime}} />

                                    </div>
                                </div>
                                
                                {console.log("구독자 수!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" , subscriber.length)}
                                {/* 참여자가 4명이상일떄 */}
                                {subscriber.length >= 4 ? (

                                    <div id="sub-videos" style={{ flex:"1 0 35%", display:"grid"}}> 
                                        {subscriber.map((sub, i) => (
            
                                                <div id="sub-video2" key={i}>
                                                    <h2>{i+1}</h2>
                                                {/* <span>{sub.id}</span> */}
                                                    <UserVideoComponent streamManager={sub} />
                                                    {/* {LenSubscribers} */}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    ) :null}

                                {/* 참여자가 3명 이하일때 빈자리 표기 */}
                                {subscriber.length <= 3 ? (
                                <div id="sub-videos" style={{ flex:"1 0 35%", display:"grid"}}> 
                                    {subscriber.map((sub, i) => (
                                            // <div id="sub-video2" key={sub.id} onClick={() => this.handleMainVideoStream(sub)} >
                                            <div id="sub-video2" key={i}>
                                                {/* <h2>{i+1}</h2> */}
                                            {/* <span>{sub.id}</span> */}
                                                <UserVideoComponent streamManager={sub} />
                                                {/* {LenSubscribers} */}
                                            </div>
                                        ))
                                    } 

                                    {renderingcount.map((count,i) => {
                                        if (count <= 3-subscriber.length){
                                            return (
                                                <div id="sub-video2" key={i}><img id="sub-video2" src="/images/img/emty.png" alt="dsa" /></div>
                                            ); 
                                        } else {
                                            return null;
                                        }
                                    })}
                                    </div>
                                    ) :null}
                                {/* 상대방 화면 */}
                                {/* <div id="sub-videos" style={{ flex:"1 0 35%", display:"grid"}}> 
                                    {subscriber.map((sub, idx) => {
                                        if (JSON.parse(sub.stream.connection.data).clientData !== myName) {
                                            return(
                                                <div id="sub-video2" key={idx}>
                                                    <UserVideoComponent streamManager={sub} />
                                                </div>
                                            )
                                        } else {
                                            return null;
                                        }
                                    })}
                                </div> */}
                            </div>
                        </div>
                        {/* <VideoApp leavethisSession={leavethisSession}/> */}
                    </div>
                </div>
                <div className="linehr">
                    <hr />
                </div>
            </div>


            <div className="footer"></div>
            {/* <button type="button" onClick={init}>Start</button>
            <h4>횟수 : {myCount}</h4> */}
            {/* <button onClick={handleLeaveSession}> 방 나가기 </button> */}
            {/* <Link to='/main'><button>게임나가기</button></Link> */}
        </div>
    )
}

export default GamePage