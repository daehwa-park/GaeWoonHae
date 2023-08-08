// openvidu + opencv 기능

import { OpenVidu } from 'openvidu-browser';    // OpenVidu 객체 생성

import axios from 'axios';
import React, { Component } from 'react';
import UserVideoComponent from './openvidu/UserVideoComponent';

// opencv+canvas
import Webcam from "react-webcam";
import { loadHaarFaceModels, detectHaarFace } from "./opencv/haarFaceDetection";  // 얼굴인식 컴포넌트
import cv from "@techstark/opencv-js";
import {Link} from 'react-router-dom'
import "./videoApp.css"

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://i9b303.p.ssafy.io/' : 'https://i9b303.p.ssafy.io/';

class videoApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mySessionId: 'qwert',    //방세션 id
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            session: undefined,
            mainStreamManager: undefined, 
            publisher: undefined,
            subscribers: [],

            modelLoaded: false,
            leavethisSession: false,

            renderingcount : [0,1,2,3],
        };

        this.joinSession = this.joinSession.bind(this);  // 세션 참여 함수
        this.leaveSession = this.leaveSession.bind(this);  // 세션 떠나기
        this.switchCamera = this.switchCamera.bind(this);   // 카메라 전환
        this.handleChangeSessionId = this.handleChangeSessionId.bind(this);  // 세션 아이디 변경
        this.handleChangeUserName = this.handleChangeUserName.bind(this);   //  유저 이름 변경
        this.handleMainVideoStream = this.handleMainVideoStream.bind(this);    // 메인 비디오 변경
        this.onbeforeunload = this.onbeforeunload.bind(this);

        // 웹캠 => canvas 적용 변수
        this.webcamRef = React.createRef();
        this.imgRef = React.createRef();
        this.faceImgRef = React.createRef();
        this.emoji = React.createRef();

        this.nextTick = this.nextTick.bind(this);
        this.detectFace = this.detectFace.bind(this);
    }
    
    //이벤트 리스너는 페이지가 mount 될때 실행 -> 게임룸 입장시 this.onbeforeunload 함수(세션나가는 조건함수)를 호출  + 세션 참여
    componentDidMount() {
        window.addEventListener('beforeunload', this.onbeforeunload);
        this.joinSession();
    }
    
    // opencv. joinSession이 마무리 될떄 nexttick 실행 => detectFace 실행 (세션 나가기 전까지 반복)
    
    // 1번 함수
    nextTick() {
        const nextTick = () => {
            if (!this.state.leavethisSession) {
                this.handle = requestAnimationFrame(async () => {
                    // console.log(this.state.leavethisSession, "세션확인@@@@@@@@@@@@@@@@@")
                    // console.log(this.state.mainStreamManager, '확인', this.state.mySessionId)
                    this.detectFace(); // 2번함수 실행
                    nextTick(); // 반복
                    });
            }
        };
        nextTick();
    }

    //2번함수
    async detectFace() { 
        const imageSrc = this.webcamRef.current.getScreenshot();  // 웹캠 화면 캡쳐 
        if (!imageSrc) return;

        this.emoji.current.src = "../../images/emoji/emoji2.png";  // 이모지

        return new Promise((resolve) => {
          this.imgRef.current.src = imageSrc;
          this.imgRef.current.onload = async () => {
            try {
              const img = cv.imread(this.imgRef.current);
              const emo = cv.imread(this.emoji.current);
  
              detectHaarFace(img,emo);    // opencv : loadHaarFaceModels()로 화면인식을 학습 => 포인트에 이모지 씌우기

              cv.imshow(this.faceImgRef.current, img);
              img.delete();  // 이미지 초기화
              resolve();
            } catch (error) {
              console.log(error, 'detectFace() 에러');
              resolve();
            }
          };
        });
    }
    
    //  React 컴포넌트가 마운트 해제되기 전에 호출되는 생명주기 메서드
    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
        
    }

    onbeforeunload(event) {
        this.setState({ leavethisSession:true })
        this.leaveSession();
    }

    //세션 ID 입력 필드의 변경 이벤트 핸들러
    handleChangeSessionId(e) {  
        this.setState({
            mySessionId: e.target.value,
        });
    }

     // 사용자 이름 입력 필드의 변경 이벤트 핸들러
    handleChangeUserName(e) {
        this.setState({
            myUserName: e.target.value,
        });
    }

    // 비디오 스트림 변경 이벤트 핸들러 true<->false
    handleMainVideoStream(stream) {   //비디오 스트림 관리자와 새로운 스트림을 비교하여 다를 경우에만 setState() 메서드를 사용하여 mainStreamManager 상태 속성을 업데이트
        if (this.state.mainStreamManager !== stream) {
            this.setState({
                mainStreamManager: stream
            });
        }
    }

    // 참여자 삭제 (한명)
    deleteSubscriber(streamManager) {
        let subscribers = this.state.subscribers;
        let index = subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            subscribers.splice(index, 1);
            this.setState({
                subscribers: subscribers,
            });
        }
    }

    // 세션 참여
    async joinSession() {
        this.setState({ modelLoaded: true });
    
        this.OV = new OpenVidu();   //  OpenVidu 객체 초기화,선언
        
        this.setState(    //  state 상태 업데이트
            {
                session: this.OV.initSession(),     // 새로운 세션 객체를 생성
            },
            () => {
                var mySession = this.state.session;     // mySession 변수 할당  : default
                
                // 새로운 스트림이 발생했을떄 실행
                mySession.on('streamCreated', (event) => {
                    var subscriber = mySession.subscribe(event.stream, undefined);   // 구독 수행-> 새로운 구독자객체
                    var subscribers = this.state.subscribers;                        // 구독자 리스트
                    subscribers.push(subscriber);                                    // 구독자 추가
                    this.setState({                                                  // state 업데이트
                        subscribers: subscribers,
                    });
                });

                 // 스트림이 사라졌을때 해당 구독자 삭제
                mySession.on('streamDestroyed', (event) => {
                    this.deleteSubscriber(event.stream.streamManager);
                });

                // 경고 문구
                mySession.on('exception', (exception) => {
                    console.warn(exception);
                });

                // 토큰을 받았을때 세션 연동
                this.getToken().then((token) => {
                    mySession.connect(token, { clientData: this.state.myUserName })                 // 함수 호출, 토큰 받기
                        .then(async () => {
                            const canvas = document.getElementById("canvas1");
                            
                            let publisher = await this.OV.initPublisherAsync(undefined, {
                                audioSource: undefined, 
                                //<canvas> 엘리먼트에서 비디오 스트림을 캡처 =>  getVideoTracks() 메서드를 호출하여 해당 스트림의 비디오 트랙을 가져옴
                                videoSource: canvas.captureStream().getVideoTracks()[0], 
                                publishAudio: true, 
                                publishVideo: true, 
                                resolution: '320x240',                                               // 해상도
                                frameRate: 30,                                                       // 프레임
                                insertMode: 'APPEND', 
                                mirror: false, 
                                
                            });

                            mySession.publish(publisher);                                            // 참여자를 객체로 스트림을 게시 , 로컬 스트림이 OpenVidu 세션에 게시

                            // 현재 사용 중인 비디오 장치 정보를 얻는다. getDevices()는 Promise를 반환하므로 await 키워드를 사용하여 비동기적으로 기다림
                            var devices = await this.OV.getDevices();
                             //얻은 비디오 장치 목록을 필터링하여 비디오 입력 장치(videoinput)만 추출
                            var videoDevices = devices.filter(device => device.kind === 'videoinput');
                            // 출판자 객체의 스트림에서 현재 사용 중인 비디오 트랙의 설정에서 장치 ID를 추출
                            var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
                             // 비디오 장치 목록에서 현재 사용 중인 비디오 장치(currentVideoDeviceId)와 일치하는 장치를 찾는다.
                            var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);
                            
                            // setState를 호출해 업데이트  => ui에서 비디오를 표기할수 있게 된다.
                            this.setState({
                                currentVideoDevice: currentVideoDevice,
                                mainStreamManager: publisher,
                                publisher: publisher,
                            });
                            
                        })
                        .catch((error) => {
                            console.log('There was an error connecting to the session:', error.code, error.message);
                        });
                });
            },
        );
        await loadHaarFaceModels();   //opencv : 학습 데이터 import
        this.nextTick();    //   1번함수 실행
    }


    // 세션방 나가기
    leaveSession() {
        this.setState({ leavethisSession:true })
        const mySession = this.state.session;              // 세션 변수로 가져오기

        if (mySession) {                                   // 세션이 있다면 종료
            mySession.disconnect();
        }

        this.OV = null;                                    //OpenVidu 객체 초기화
        this.setState({                                    // 상태 초기화. 관리자, 참여자리스트 등
            session: undefined,
            subscribers: [],
            mySessionId: 'SessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            mainStreamManager: undefined,
            publisher: undefined
        });
    }

    // 카메라 전환 기능
    async switchCamera() {
        try {
            const devices = await this.OV.getDevices()                                    // 현재 사용 가능한 모든 비디오 장치 정보를 얻는다
            var videoDevices = devices.filter(device => device.kind === 'videoinput');    //비디오 입력 장치(videoinput)만 필터링하여 videoDevices 배열에 저장
            
            //비디오 장치가 2개 이상이고, 새로운 비디오 장치로 전환할 수 있는 경우
            if (videoDevices && videoDevices.length > 1) {   

                var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

                if (newVideoDevice.length > 0) {                                            // 새로운 비디오 장치가 선택되었는지 확인
        
                    var newPublisher = this.OV.initPublisher(undefined, {                   //새로운 비디오 소스를 가진 새로운 출판자 객체(newPublisher)를 생성
                        videoSource: newVideoDevice[0].deviceId,
                        publishAudio: true,
                        publishVideo: true,
                        mirror: true
                    });

                    await this.state.session.unpublish(this.state.mainStreamManager)        // 게시

                    await this.state.session.publish(newPublisher)
                    this.setState({                                                         // 상태 업데이트
                        currentVideoDevice: newVideoDevice[0],
                        mainStreamManager: newPublisher,
                        publisher: newPublisher,
                    });
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        const mySessionId = this.state.mySessionId;
        const myUserName = this.state.myUserName;
        // const modelLoaded = this.state.modelLoaded;
        // const LenSubscribers = this.state.subscribers.length;  // 참가자 수 카운트

        return (
            <div className="container">
                {/* 세션이 생성 실패한 경우 */}
                {this.state.session === undefined ? (
                    <div id="join">
                        <div id="img-div">
                            <img src="resources/images/openvidu_grey_bg_transp_cropped.png" alt="OpenVidu logo" />
                        </div>
                        <div id="join-dialog" className="jumbotron vertical-center">
                            <h1> Join a video session </h1>
                            <form className="form-group" onSubmit={this.joinSession}>
                                <p>
                                    <label>Participant: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="userName"
                                        value={myUserName}
                                        onChange={this.handleChangeUserName}
                                        required
                                    />
                                </p>
                                <p>
                                    <label> Session: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="sessionId"
                                        value={mySessionId}
                                        onChange={this.handleChangeSessionId}
                                        required
                                    />
                                </p>
                                <p className="text-center">
                                    <input className="btn btn-lg btn-success" name="commit" type="submit" value="JOIN" />
                                </p>
                            </form>
                        </div>
                    </div>
                ) : null}
                
                {/* 세션 접속에 성공한 경우 */}
                {this.state.session !== undefined ? (
                    <div id="session">
                        {/* 웹캠 라이브러리 화면. canvas1 요소 가져오기 위해 사용 */}
                        <div style={{ width: "400px" ,visibility:"hidden" ,display:"flex", position:"absolute"}}>
                            <Webcam
                                ref={this.webcamRef}
                                className="webcam"
                                mirrored
                                screenshotFormat="image/jpeg"
                            />
                            <img className="inputImage" alt="input" ref={this.imgRef} style={{display:'none' }}/>
                            <canvas id="canvas1" className="outputImage" ref={this.faceImgRef}  style={{visibility:"hidden"}}/>
                            <img className="emoji" alt="input" ref={this.emoji} style={{display:'none'}}></img>
                        </div>


                        <div id="video-container" style={{ display:"flex"}}>
                            {/* 내 화면 */}
                            <div id="main-videos" style={{ flex:"1 0 60%" }}>
                                {this.state.mainStreamManager !== undefined ? (
                                    <div id="main-video" >
                                        <UserVideoComponent streamManager={this.state.mainStreamManager} />
                                    </div>
                                ) : null}
                            </div>

                            {/* 참여자 화면 */}
                            {/* <div id="emty-videos" style={{ flex:"1 0 5%", display:"grid"}}></div> */}
                                {this.state.subscribers.length >= 4 ? (

                                    <div id="sub-videos" style={{ flex:"1 0 35%", display:"grid"}}> 
                                        {/* {this.state.publisher !== undefined ? (
                                            <div id="sub-video" onClick={() => this.handleMainVideoStream(this.state.publisher)} >
                                                <UserVideoComponent
                                                    streamManager={this.state.publisher} />
                                            </div>
                                        ) : null} */}

                                        {this.state.subscribers.map((sub, i) => (
                                                // <div id="sub-video2" key={sub.id} onClick={() => this.handleMainVideoStream(sub)} >
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

                                {/* <div>'참여자 :',{this.state.subscribers.length}</div> */}
                                {this.state.subscribers.length <= 3 ? (
                                    <div id="sub-videos" style={{ flex:"1 0 35%", display:"grid"}}> 
                                        {this.state.subscribers.map((sub, i) => (
                                                // <div id="sub-video2" key={sub.id} onClick={() => this.handleMainVideoStream(sub)} >
                                                <div id="sub-video2" key={i}>
                                                    {/* <h2>{i+1}</h2> */}
                                                {/* <span>{sub.id}</span> */}
                                                    <UserVideoComponent streamManager={sub} />
                                                    {/* {LenSubscribers} */}
                                                </div>
                                            ))
                                        } 


                                        {this.state.renderingcount.map((count,i) => {
                                            if (count <= 3-this.state.subscribers.length){
                                                return (
                                                    <div id="sub-video2" key={i}><img id="sub-video2" src="/images/img/emty.png" alt="dsa" /></div>
                                                ); 
                                            } else {
                                                return null;
                                            }
                        
                                        })}

                                    </div>
                                ) :null}

                        </div>

                        {/* 기능 버튼 <세션 나가기, 화면 전환> */}
                        <div id="session-header">
                            {/* 세션명 */}
                            {/* <h1 id="session-title">{mySessionId}</h1>    */}
                            <Link to='/main'>
                                <input
                                    className="btn btn-large btn-danger"
                                    type="button"
                                    id="buttonLeaveSession"
                                    onClick={this.leaveSession}
                                    value="방 나가기"
                                />
                            </Link>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }

    // 토큰 생성+ 세션생성+ 토큰 획득
    async getToken() {
        const sessionId = await this.createSession(this.state.mySessionId);
        return await this.createToken(sessionId);
    }

    async createSession(sessionId) {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data; 
    }

    async createToken(sessionId) {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data; 
    }
}

export default videoApp;
