import { OpenVidu } from 'openvidu-browser';

import axios from 'axios';
import React, { Component } from 'react';
import UserVideoComponent from './UserVideoComponent';

// opencv+canvas
import Webcam from "react-webcam";
import { loadHaarFaceModels, detectHaarFace } from "./haarFaceDetection";  // 얼굴인식 컴포넌트
import cv from "@techstark/opencv-js";

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';

class videoApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mySessionId: 'SessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            session: undefined,
            mainStreamManager: undefined, 
            publisher: undefined,
            subscribers: [],

            modelLoaded: false,
        };

        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);

        this.webcamRef = React.createRef();
        this.imgRef = React.createRef();
        this.faceImgRef = React.createRef();
        this.emoji = React.createRef();

        this.nextTick = this.nextTick.bind(this);
        this.detectFace = this.detectFace.bind(this);
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.onbeforeunload);
        this.joinSession();
    }
    
    // opencv
    
    nextTick() {
        
        // 1번 함수
        const nextTick = () => {
        this.handle = requestAnimationFrame(async () => {
            this.detectFace(); // 2번함수 실행
            nextTick(); // 반복
            });
        };
        // 1번 함수 실행
        nextTick();
    }
    
    async detectFace() { //2번함수
        const imageSrc = this.webcamRef.current.getScreenshot();
        if (!imageSrc) return;

        this.emoji.current.src = "../../images/emoji/emoji2.png";

        return new Promise((resolve) => {
          this.imgRef.current.src = imageSrc;
          this.imgRef.current.onload = async () => {
            try {
              const img = cv.imread(this.imgRef.current);
              const emo = cv.imread(this.emoji.current);
  
              detectHaarFace(img,emo);

              cv.imshow(this.faceImgRef.current, img);
              img.delete();
              resolve();
            } catch (error) {
              console.log(error);
              resolve();
            }
          };
        });
    }
    
    
    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
        
    }

    onbeforeunload(event) {
        this.leaveSession();
    }

    handleChangeSessionId(e) {
        this.setState({
            mySessionId: e.target.value,
        });
    }

    handleChangeUserName(e) {
        this.setState({
            myUserName: e.target.value,
        });
    }

    handleMainVideoStream(stream) {
        if (this.state.mainStreamManager !== stream) {
            this.setState({
                mainStreamManager: stream
            });
        }
    }

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

    async joinSession() {
        this.setState({ modelLoaded: true });
    
        this.OV = new OpenVidu();
        
        this.setState(
            {
                session: this.OV.initSession(),
            },
            () => {
                var mySession = this.state.session;
                
                mySession.on('streamCreated', (event) => {
                    var subscriber = mySession.subscribe(event.stream, undefined);
                    var subscribers = this.state.subscribers;
                    subscribers.push(subscriber);

   
                    this.setState({
                        subscribers: subscribers,
                    });
                });


                mySession.on('streamDestroyed', (event) => {

                    this.deleteSubscriber(event.stream.streamManager);
                });

                mySession.on('exception', (exception) => {
                    console.warn(exception);
                });

                this.getToken().then((token) => {
                    mySession.connect(token, { clientData: this.state.myUserName })
                        .then(async () => {
                            let publisher = await this.OV.initPublisherAsync(undefined, {
                                audioSource: undefined, // The source of audio. If undefined default microphone
                                videoSource: undefined, // The source of video. If undefined default webcam
                                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                                resolution: '640x480', // The resolution of your video
                                frameRate: 30, // The frame rate of your video
                                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                                mirror: false, // Whether to mirror your local video or not
                            });


                            mySession.publish(publisher);

      
                            var devices = await this.OV.getDevices();
                            var videoDevices = devices.filter(device => device.kind === 'videoinput');
                            var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
                            var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

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
        await loadHaarFaceModels();
        this.nextTick();
    }

    leaveSession() {

        const mySession = this.state.session;

        if (mySession) {
            mySession.disconnect();
        }

        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: 'SessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            mainStreamManager: undefined,
            publisher: undefined
        });
    }

    async switchCamera() {

        try {
           
            const devices = await this.OV.getDevices()
            var videoDevices = devices.filter(device => device.kind === 'videoinput');

            if (videoDevices && videoDevices.length > 1) {

                var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

                if (newVideoDevice.length > 0) {

                    var newPublisher = this.OV.initPublisher(undefined, {
                        videoSource: newVideoDevice[0].deviceId,
                        publishAudio: true,
                        publishVideo: true,
                        mirror: true
                    });

         
                    await this.state.session.unpublish(this.state.mainStreamManager)

                    await this.state.session.publish(newPublisher)
                    this.setState({
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

        const modelLoaded = this.state.modelLoaded;
    
        return (
            <div className="container">
                {this.state.session === undefined ? (
                    <div id="join">
                            <h1> 다시 세션 들어가기. </h1>
                            <form className="form-group" onSubmit={this.joinSession}>
                                <p className="text-center">
                                    <input className="btn btn-lg btn-success" name="commit" type="submit" value="JOIN" />
                                </p>
                            </form>
                    </div>
                ) : null}

                {this.state.session !== undefined ? (
                    <div id="session">
                        <div style={{ width: "300px" ,visibility:"hidden" ,display:"flex"}}>
                            <Webcam
                            // 웹캠 라이브러리 내 화면
                                ref={this.webcamRef}
                                className="webcam"
                                mirrored
                                screenshotFormat="image/jpeg"
                            />
                        </div>

                        {/* 필터링 된 화면 */}

                        <div style={{ width: "320px" }}>
                            <h1>필터링 화면</h1>
                            <img className="inputImage" alt="input" ref={this.imgRef} style={{visibility:"hidden"}}/>
                            <canvas className="outputImage" ref={this.faceImgRef} />
                            <img className="emoji" alt="input" ref={this.emoji} style={{visibility:"hidden"}} ></img>
                        </div>
       
                        {/* 로딩문구 */}
                        {!modelLoaded && <div>Loading Haar-cascade face model...</div>}
                    


                        <div id="session-header">
                            <h1 id="session-title">{mySessionId}</h1>
                            <input
                                className="btn btn-large btn-danger"
                                type="button"
                                id="buttonLeaveSession"
                                onClick={this.leaveSession}
                                value="Leave session"
                            />
                            <input
                                className="btn btn-large btn-success"
                                type="button"
                                id="buttonSwitchCamera"
                                onClick={this.switchCamera}
                                value="Switch Camera"
                            />
                        </div>

                        {this.state.mainStreamManager !== undefined ? (
                            <div id="main-video" className="col-md-6">
                                <UserVideoComponent streamManager={this.state.mainStreamManager} />

                            </div>
                        ) : null}
                        <div id="video-container" className="col-md-6">
                            {this.state.publisher !== undefined ? (
                                <div className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                                    <UserVideoComponent
                                        streamManager={this.state.publisher} />
                                </div>
                            ) : null}
                            {this.state.subscribers.map((sub, i) => (
                                <div key={sub.id} className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(sub)}>
                                    <span>{sub.id}</span>
                                    <UserVideoComponent streamManager={sub} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }


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
