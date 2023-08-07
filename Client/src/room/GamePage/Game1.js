import VideoApp from '../../features/openvidu_opencv/videoApp.js'
import ChatModal from "../../components/GamePage/ChatModal.js"
import "./Game.css"
import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux/es/hooks/useSelector"
import SockJS from "sockjs-client"
import Stomp from "stompjs"

// 게임페이지1 - 박터트리기
// 사용 component : components폴더 => chatting modal
//                  features폴더 => openvidu => videoApp(openvidu서버연결), uservideo,OvVideo(비디오생성)
//                               => openCV   => videoApp(nextTick함수) => haarFaceDetection,cvDataFile(학습)



function Game1(){
    const [leavethisSession] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const showModal = () => {
        setModalOpen(true);
    };

    const hostName = useSelector((state) => state.roomInfo.hostName);
    const myName = useSelector((state) => state.auth.user.nickname);
    const gameType = useSelector((state) => state.roomInfo.gameType);
    // const sessionId = useSelector((state) => state.roomInfo.sessionId);
    const sessionId = "1";

    var URL = "https://teachablemachine.withgoogle.com/models/M-BMZ7bbw/";
    var model;
    var webcam;
    var ready = false;
    var done = false;

    var readyb = false;
    var readyb2 = false;
    var setb = false;
    var gob = false;

    const [myCount, setMyCount] = useState(0);
    const [stompClient, setStompClient] = useState();
    const [userList, setUserList] = useState([
        {username: "정원", count: 0}, 
        {username: "김두현", count: 0}, 
        {username: "수빈", count: 0}, 
        {username: "우승빈", count: 0}, 
        {username: "양준영", count: 0}
    ]);

    // 초기 stompclient 선언

    // var userList = [
    //     {username: "정원", count: 0}, 
    //     {username: "김두현", count: 0}, 
    //     {username: "수빈", count: 0}, 
    //     {username: "우승빈", count: 0}, 
    //     {username: "양준영", count: 0}
    // ]

    useEffect(() => {
        // Teachable Machine, PoseNet CDN 링크를 동적으로 추가
        if(myCount === 0){
        const addScript = (url) => {
          const script = document.createElement('script');
          script.src = url;
          script.async = true;
          document.body.appendChild(script);
        };
    
        addScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js');
        addScript('https://cdn.jsdelivr.net/npm/@teachablemachine/pose@0.8/dist/teachablemachine-pose.min.js');

        connect();
        }
        else {
            console.log(myCount);
            gameInfoChange();
        }
    }, [myCount]);

    //stomp 연결
    const connect = () => {
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

    const gameInfoChange = () => {
        console.log(stompClient);
        stompClient.send(
            "/app/gameroom/" + sessionId + "/gameInfo",{},
            // 내 정보를 해당 채널로 보내면 됨
            JSON.stringify({ username: myName, count: myCount})
        );
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

    const init = async () => {
        console.log(gameType);
        
        switch(gameType) {
            case 1: URL = 'https://teachablemachine.withgoogle.com/models/M-BMZ7bbw/';
                break;
            case 2: URL = 'https://teachablemachine.withgoogle.com/models/ZWOxIpSRc/';
                break;
            case 3: URL = 'https://teachablemachine.withgoogle.com/models/4lQr_1IZz/';
                break;
            default:
                URL = 'https://teachablemachine.withgoogle.com/models/M-BMZ7bbw/';
        }
        console.log(URL);
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        const tmModel = await window.tmPose.load(modelURL, metadataURL);
        console.log(tmModel);
        model = tmModel;
        
        const size = 200;
        const flip = true; // whether to flip the webcam
        webcam = new window.tmPose.Webcam(size, size, flip);
        console.log(webcam);
        webcam.setup()
        .then(() => {
            console.log("play");
            webcam.play();
            window.requestAnimationFrame(loop);
        })
        .catch((err) => console.error('Error accessing the webcam:', err));

    }

    const loop = async (timestamp) => {
        webcam.update();
        // console.log("loop");
        switch(gameType) {
            case 1: await predict();
                break;
            case 2: await predictBak();
                break;
            case 3: 
                break;
            default:
                await predict();
        }
    
    window.requestAnimationFrame(loop);
    };

    const predict = async () => {
    if (model && webcam) {
        const {pose, posenetOutput} = await model.estimatePose(webcam.canvas);

        const prediction = await model.predict(posenetOutput);

        // for (let i = 0; i < maxPredictions; i++) {
            if (!ready && prediction[0].probability > 0.85) {
                console.log(ready);
                ready = true;
                console.log("ready -> true");
            }
            else if (ready && !done && prediction[1].probability > 0.85) {
                done = true;
                console.log("done -> true");
            }
            else if (done) {
                setMyCount(prev => prev + 1);
                // handleCount();
                ready = false;
                done = false;
            }
            // displayCountRef.current.textContent = "현재 머리 좌우 SWING 게임 " + count + "회 수행중!!";
        // }
        }
    }

const predictBak = async () => {
    if (model && webcam) {
        const {pose, posenetOutput} = await model.estimatePose(webcam.canvas);

        const prediction = await model.predict(posenetOutput);

        // for (let i = 0; i < maxPredictions; i++) {
            if (!readyb && !readyb2 && prediction[0].probability > 0.85) {
                console.log(readyb);
                readyb = true;
                console.log("readyb -> true");
            }
            else if (readyb && !setb && prediction[1].probability > 0.85) {
                setb = true;
                console.log("setb -> true");
            }
            else if (readyb && setb && prediction[0].probability > 0.85) {
                readyb2 = true;
                readyb = false
                console.log("readyb2 -> true");
            }
            else if (setb && readyb2 &&!gob && prediction[2].probability > 0.85) {
                gob = true;
                console.log("gob -> true");
            }
            else if (gob) {
                setMyCount(prev => prev + 1);
                // handleCount();
                readyb = false;
                readyb2 = false;
                setb = false;
                gob = false;
            }
            // displayCountRef.current.textContent = "현재 머리 좌우 SWING 게임 " + count + "회 수행중!!";
        // }
    }
}


    return (
        <div className='gamepage'>
            <div className="head">
                <span>l l l</span>
                <span className='Logo1'>게운해 </span>
                <span className='Logo2'>GAEWOONHAE</span>
            </div>
            <button type="button" onClick={init}>Start</button>
            <h4>횟수 : {myCount}</h4>
            <div className="mainscreen">
                <div className='gametitle'>
                    <h1 className='titlename'>박 터트리기!!</h1>
                    <p >빠르고 정확한 동작으로 더 많이 박을 터트리세요!</p>
                    <hr />
                </div>
                <div className="gamescreen">
                    <div className='messagebtntag'>
                        {/* 채팅 모달창 */}
                            <button className='messagebtn' onClick={showModal}>버튼</button>
                            {modalOpen && <ChatModal className='chatmodal' setModalOpen={setModalOpen} />}
                         
                    </div>
                    <div className="mainvideo">
                        <VideoApp leavethisSession={leavethisSession}/>
                    </div>
                </div>
                <div className="linehr">
                    <hr />
                </div>
            </div>
            <div className="footer"></div>
            {/* <button onClick={handleLeaveSession}> 방 나가기 </button> */}
            {/* <Link to='/main'><button>게임나가기</button></Link> */}
            
        </div>
    )
}

export default Game1