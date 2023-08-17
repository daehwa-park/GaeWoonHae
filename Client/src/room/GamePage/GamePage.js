import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux"
import './GamePage.css'
import GameEndBtn from "../../components/modal/gameEnd"
import logo from '../../assets/img/purple_logo.png' 
import { useNavigate } from 'react-router-dom';
//게임종료를 위한 action 호출
import { enterRoomAction } from "../../features/Actions/enterRoomAction";
import empty from "../../assets/img/empty.png";


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
import { current } from '@reduxjs/toolkit';
import OpenViduVideoComponent from '../../features/openvidu_opencv/openvidu/OvVideo';

import Endloading from '../../assets/img/end_loading.gif'

// 게임페이지



const GamePage = () => {
    const dispatch = useDispatch();
    // 게임 진행시간
    const [gameTime,setGameTime] = useState(0);

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
    const hostName = useSelector((state) => state.roomInfo.hostName);
    const myName = useSelector((state) => state.auth.user.nickname);
    const sessionId = useSelector((state) => state.roomInfo.sessionId);
    const gameType = useSelector((state) => state.roomInfo.gameType);
    const limitTime = useSelector((state) => state.roomInfo.limitTime);
    // const limitTime=14;
    // const emoji = useSelector((state) => state.user.emoji);
    const firstUserList = useSelector((state) => state.roomInfo.userList);
    const userId = useSelector((state) => state.auth.user.userId);
    const useremojiId = useSelector(state => state.auth.user.emojiId);
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
    const [finishUserCount, setfinishUserCount] = useState(0);
    // let finishUserCount =0;
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [gameLoad, setGameLoad] = useState(false);
    const [assetLoad, setAssetLoad] = useState(true);
    const [renderingUserList, setrenderingUserList] = useState(firstUserList);
    const userList = useRef(firstUserList);
    const [renderingcount,setRenderingcount] = useState([0,1,2,3])
    //0809 추가
    

    // refs for openCV
    const webcamRef = useRef();
    const imgRef = useRef();
    const faceImgRef = useRef();
    const emojiRef = useRef();
    const updateEmojiId = useRef();
    const finishGameTimer = useRef(undefined);

    // 비디오 종료 조건
    const stopVideo = useRef(false);

    // 타이틀 
    const titleimgRef = useRef(`/images/img/gametypelogo${gameType}.png`)


    // openVidu Object
    let OV;
    // let finishUserCount=0;
    // timer
    const finishUserCountRef = useRef(0);
    const countRef = useRef(0);
    
    // 모달 입장
    // const showLobbyModal = () => {
    //     setGameModalOpen(true);
    // };

    // 네비게이션
    const navigate = useNavigate();


    // 네비게이션
    const goMain =() => {
        stopVideo.current = true
        navigate('/main')
    }

    // openCV Settings
    
    const updateEmoji = async () => {
        if (stopVideo.current) {
            cancelAnimationFrame(updateEmojiId.current);
            return;
        }

        await detectFace();
        updateEmojiId.current = requestAnimationFrame(updateEmoji);
    }

    const detectFace = () => {
        
        const imageSrc = webcamRef.current.getScreenshot();
        
        if (!imageSrc) return;
        
        return new Promise((resolve) => {
            imgRef.current.src = imageSrc;
            imgRef.current.onload = async () => {
                try {
                    const img = cv.imread(imgRef.current);
                    if(useremojiId !== 11){
                        emojiRef.current.src = `../../images/emoji/emoji${useremojiId}.png`;
                        const emo = cv.imread(emojiRef.current);
                        detectHaarFace(img,emo);    // opencv : loadHaarFaceModels()로 화면인식을 학습 => 포인트에 이모지 씌우기
                    }
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

        var headers = {
            name: myName,
            roomNumber: sessionId,
        };

        stompClient.connect(headers, function (frame){ 

            stompClient.subscribe( 
                // 게임정보 주고 받는 채널 구독
                "/topic/gameroom/" + sessionId + "/gamefinish",
                (message) => {
                    const parsedMessage = JSON.parse(message.body);
                    // 메시지가 "전체 게임 종료" 이면 각자 axios 발사하고 게임종료 페이지로 이동함.
                    if(parsedMessage.content === "게임종료") {
                        //axios 발사 
                        recordSave();
                        setGameModalOpen(true);
                        console.log("모든 유저의 게임이 종료되었습니다!!")
                    }
                    // 방장만 finishUsercount 관리함
                    else if(myName === hostName) {
                        setfinishUserCount(++finishUserCountRef.current);
                        console.log("한놈 끝났다.");
                    }
                }
            );

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
        // userList에서 닉네임 같은 놈 찾아서 카운트 바꾸고 반영(0809)
        const updateUserList = userList.current.map((user) => {
            if (user.username === gameInfo.username) {
                return { ...user, count: gameInfo.count }; // 해당 유저의 count를 업데이트한 새 객체 반환
            }
            return user; // 조건에 맞지 않는 경우 기존 객체 그대로 반환
        });

        updateUserList.sort((a, b) => b.count - a.count);
        
        userList.current = updateUserList;
        setrenderingUserList(updateUserList);
        console.log(updateUserList);
        console.log(userList);
    }

    const gameInfoChange = () => {
        countRef.current=count;
        stompClient.send(
            "/app/gameroom/" + sessionId + "/gameinfo",{},
            // 내 정보를 해당 채널로 보내면 됨
            JSON.stringify({ username: myName, count: count})
        );
    }

    // 0809 추가
    const myGameFinish = () => {
        stompClient.send(
            "/app/gameroom/" + sessionId + "/gamefinish",{},
            // 내 정보를 해당 채널로 보내면 됨
            JSON.stringify({chat: myName+"님의 게임이 종료되었습니다."})
        );
        console.log("나 끝났다");
    }
    // 게임종료시 실행하는 axios 요청
    const recordSave = async () => {
        console.log("게임끝나서 db에 저장함"+count)
        const requestData = {
          userId: userId,
          gameType: gameType,
          count:countRef.current,
          
        };
        await dispatch(enterRoomAction.recordSave(requestData));
      };


    //로딩 후 3초 카운트가 끝나고 호출되는 함수
    const updateLoadingComplete = () => {
        loadcomplete.current = true
        console.log(loadcomplete.current, '로딩완료@@@@@@@@@@@@@@@@@@@@@@@@@')
    }

    // 언마운트시에 비디오 종료
    const onUnmount = () => {
        stopVideo.current = true
        console.log('언마운트 성공')
    }

    // 게임 종료 방 상태 변경
    const finishedGameStatus = async () => {
        const requestData = {
          sessionId,
          gameType: gameType,
        };
        await dispatch(enterRoomAction.finishedRoom(requestData));
      };

    // useEffects

    useEffect(() => {

        const init = async () => {
            // music.currentTime = 0;

            if (sessionId === '') {
                // send page to error
            }

            await loadHaarFaceModels();
            updateEmojiId.current = requestAnimationFrame(updateEmoji);
            console.log("MODEL LOADED!!!!!!!!!!!!!!!!!!!!")

            joinSession();

            connectStomp();

            console.log("현재 게임 타입 : ",gameType);
        }

        init();
        return onUnmount  
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {

        if (stompLoad && openViduLoad && gameLoad) {
            setStarted(true);
        }

    },[stompLoad, openViduLoad, gameLoad])



    useEffect(() => {
        
        setGameTime(limitTime);
        //로딩 조건
        if (started) {
            console.log("게임 시작!!!!!!!!!!!!!!");
            setLoading(false);
            setCounting(true);
            
            // 버스 로딩 끝나고 => 3초 카운트 다운시작
            setTimeout(()=> {
                setCounting(false);
            }, countdown);

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [started])
    
    useEffect(() => {
        if (finished) {
            console.log("게임 종료!!!!!!!!!!!!!!!");
            myGameFinish();
            onUnmount();
            // setGameModalOpen(true);
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

    //0809
    useEffect(()=> {
        console.log("현재 참여 유저 리스트 수",userList.current.length, "끝난 유저 수", finishUserCountRef.current);
        if (myName === hostName && (finishUserCountRef.current>=userList.current.length || finishUserCountRef.current >= 3)) {
            stompClient.send(
                "/app/gameroom/" + sessionId + "/gamefinish",{},
                // 내 정보를 해당 채널로 보내면 됨
                JSON.stringify({ chat: "게임종료" })
            );
            finishedGameStatus();
            console.log("자 이제 넘어가도록 하지");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[finishUserCount])

    // useEffect(()=> {
    //     console.log(userList);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[userList])

    const getNicknameTag = (sub) => {
        // Gets the nickName of the user
        return JSON.parse(sub.stream.connection.data).clientData;
      };


    return (
        <div className='gamepage'>
            {/* 헤더 */}
            <div className="game-header" onClick={goMain}>
                <img className="main-hover"  src={logo} alt="" />
            </div>
            <div className="game-mainscreenimg">
            <div className="game-mainscreen">
                {/* 로딩 애니메이션 */}
                {loading ? <Loading /> : null }
                {counting ? <CountLoading updateLoadingComplete={updateLoadingComplete} /> : null}
                {/* 게임 종료 모달 */}
                {GamemodalOpen && (<GameEndBtn className="gameenmodal" setModalOpen={setGameModalOpen} props={{renderingUserList}}/>)}

                <div className="gamescreen">
                    <div className='messagebtntag'>
                        {gameType===1 ? (
                            <div className='gametitles'>
                                <img className='game-logo' src={titleimgRef.current} alt=""/>
                                <p className='game-titletag' >빠르고 정확한 동작으로 <br/>더 많은 모기를 잡으세요!</p>
                            </div>

                        ) : null}
                        {gameType===2 ? (
                            <div className='gametitles'>
                                <img className='game-logo' src={titleimgRef.current} alt=""/>
                                <p className='game-titletag' >제시된 동작을 취해주세요! <br/>정확한 동작을 취할수록 높은 점수를 얻습니다.</p>
                            </div>
                        ) : null}

                        {/* <div className='ranking'>
                            <div className='ranking1'>현재 랭킹</div>
                            <div className='ranking2'>
                                1위 : <br/>2위 : <br/>3위 : <br/>4위 : <br/>
                            </div>
                        </div> */}
                        {/* 게임 로직 컴포넌트 (아무 배치요소 없음) */}
                        <div className='gameloader'>
                            <GameLoader props={{setCount, started, finished, gameType, setGameLoad, countdown, loadcomplete}} />
                        </div>
                    </div>
                    <div className="mainvideo">
                
                        <div id="session">
                            {/* OpenCV용 Canvas (전부 invisible 시켜놓으면 됨) */}

                            {/* 위에 공통 UI */}
                            <CommonUI props={{count, timer, renderingUserList, loadcomplete, finished, setFinished, gameTime, gameType}} />
                            <div id="video-container" style={{ display:"flex"}}>
                                {/* 내 화면 */}
                                <div id="game-main-videos">
                                    {finished ? (<div className='blockingmodal'>
                                        <div className='blockingmodal'>
                                            <div className='blockingmodal-text'>
                                                다른사람이 끝날때까지 잠시만 기다려 주세요.
                                            </div>
                                            {/* <img className='blockingmodal-text' src={Endloading} alt="" /> */}
                                        </div>
                                    </div>) : null}
                                    <div id="game-main-video" >
                                        <Webcam
                                            ref={webcamRef}
                                            className="webcam"
                                            mirrored
                                            style={{visibility:"hidden", width: "400px", position:"absolute"}}
                                            screenshotFormat="image/jpeg" />
                                        <canvas id="canvas1" className="game-outputImage" ref={faceImgRef} />
                                        <img className="inputImage" alt="input" ref={imgRef} style={{display:'none' }}/>
                                        <img className="emoji" alt="input" ref={emojiRef} style={{display:'none'}} />
                                        {/* <Webcam
                                                ref={webcamRef}
                                                className="webcam"
                                                style={{ width: "400px" , visibility: "hidden",display:"flex", position:"absolute"}}
                                                mirrored
                                                // screenshotFormat="image/jpeg" 
                                        />
                                        <canvas id="canvas-game" className="outputImage-game" ref={faceImgRef} style={{width: "400px"}}/>
                                        <img className="inputImage-game" alt="input" ref={imgRef} style={{display:'none' }}/>
                                        <img className="emoji-game" alt="input" ref={emojiRef} style={{display:'none'}} /> */}
                                        {/* <UserVideoComponent id="main-videocss" streamManager={mainStreamManager} /> */}
                                    </div>
                                </div>

                                {console.log("구독자 수!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" , subscriber.length)}
                                {/* 참여자가 4명이상일떄 */}
                                
                                {subscriber.length >= 4 ? (
                                    <div id="sub-videos" > 
                                        {/* <div id={`sub-titlebox${gameType}`}></div> */}
                                        <div className='sublist'>참가자</div>
                                        {subscriber.map((sub, i) => (
            
                                                <div id="sub-video2 sub-titlebox" key={i}>
                                                    {/* <UserVideoComponent streamManager={sub} /> */}
                                                    <div>
                                                        {sub !== undefined ? (
                                                            <div className="streamcomponent">
                                                                <div className="sub-name">{getNicknameTag(sub)}</div>
                                                                <OpenViduVideoComponent streamManager={sub} />
                                                                {/* <div><p>{this.getNicknameTag()}</p></div> */}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                
                                                </div>
                                            ))
                                        }
                                    </div>
                                    ) :null}

                                {/* 참여자가 3명 이하일때 빈자리 표기 */}
                                {subscriber.length <= 3 ? (
                                <div id="sub-videos" > 

                                    <div className='sublist'>참가자</div>
                                    {/* <div id={`sub-titlebox${gameType}`}></div> */}
                                    {subscriber.map((sub, i) => (
                                            // <div id="sub-video2" key={sub.id} onClick={() => this.handleMainVideoStream(sub)} >
                                            <div id="sub-video2" key={i}>
                                                {/* <UserVideoComponent streamManager={sub} /> */}
                                                <div>
                                                        {sub !== undefined ? (
                                                            <div className="streamcomponent">
                                                                <div className="sub-name">{getNicknameTag(sub)}</div>
                                                                <OpenViduVideoComponent streamManager={sub} />
                                                                {/* <div><p>{this.getNicknameTag()}</p></div> */}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                            </div>
                                        ))
                                    } 

                                    {renderingcount.map((count,i) => {
                                        if (count <= 3-subscriber.length){
                                            return (
                                                <div id="sub-video2 sub-titlebox" key={i}><img id="sub-video2" src={empty} alt="EMPTY" /></div>
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
                </div>
            
            </div>


            <div className="footer"></div>
            {/* <button type="button" onClick={init}>Start</button>
            <h4>횟수 : {myCount}</h4> */}
            <button className="btn-back2" onClick={goMain}> 방 나가기 </button>
            {/* <Link to='/main'><button>게임나가기</button></Link> */}
        </div>
    )
}

export default GamePage