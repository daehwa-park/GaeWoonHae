import React, { useEffect, useRef, useState } from 'react';

import JumpingJack from './ui/JumpingJack';
import './GameLoader.css';
import Pictogram from './ui/Pictogram';

const GameLoader = ({props}) => {

    const [audioPlaying, setAudioPlaying] = useState(false);
    // Props
    const setCount = props.setCount;
    const started = props.started;
    const finished = props.finished;
    const gameType = props.gameType;
    const setGameLoad = props.setGameLoad;
    const countdown = props.countdown;
    let loadcomplete = props.loadcomplete.current; //실질적으로 게임이 시작되는 지점

    // states
    const [model, setModel] = useState();
    const [model2, setModel2] = useState();
    const [webcam, setWebcam] = useState();
    const [curPoseState, setCurPoseState] = useState();
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);

    const predictCheck = useRef(false);

    const curPose = useRef();
    const poseList = useRef([]);

    const URL = useRef("");
    const URL2 = useRef("");
    const loopPredId = useRef(null);
    const failTimerId = useRef(null);
    const finishedRef = useRef(false);

    // catch mosquito
    const ready1 = useRef(true);
    const ready2 = useRef(false);
    const set = useRef(false);

    // 픽토그램 딜레이 시간
    const waitTime = useRef(500);


    const getNextPose = () => {
        predictCheck.current = false;
        let num = curPose.current;
        
        while(num === curPose.current) {
            num = poseList.current[Math.floor(Math.random() * poseList.current.length)];
        }

        setCurPoseState(num);
        curPose.current = num;

        console.log("자세 바뀜~~@@@@@@@@@@@@@@@");
        if (!finished) {
            failTimerId.current = setTimeout(() => {
                setFail(true);
            }, 6000);
        }

        setTimeout(() => {
            predictCheck.current = true;
        }, waitTime.current);
    }


    /*
    * Teachable Machine Settings
    */

    const initModel = async () => {

        switch(gameType) {
            case 1: 
                URL.current = 'https://teachablemachine.withgoogle.com/models/-T38dkjNF/';
                poseList.current = [0, 1, 2, 3];
                waitTime.current = 500;
                break;
            case 2: 
                URL.current = 'https://teachablemachine.withgoogle.com/models/074HcVDD9/';
                URL2.current = 'https://teachablemachine.withgoogle.com/models/C9-H895DS/'
                poseList.current = [0, 1, 2, 3, 4, 5, 6];
                waitTime.current = 2000;
                break;
            default:
                URL.current = 'https://teachablemachine.withgoogle.com/models/-T38dkjNF/';
                break;
        }

        await setTmModel();

        // Convenience function to setup a webcam
        const size = 200;
        const flip = true; // whether to flip the webcam
        let webcam = new window.tmPose.Webcam(size, size, flip); // width, height, flip
        await webcam.setup()
        .then(() => {
            console.log("play");
            webcam.play();
            setWebcam(webcam);
        })
        .catch((err) => console.error('Error accessing the webcam:', err));
    }

    const setTmModel = async() => {
        if (gameType === 1) {
            const modelURL = `${URL.current}model.json`;
            const metadataURL = `${URL.current}metadata.json`;
    
            setModel(await window.tmPose.load(modelURL, metadataURL));
        } else if (gameType === 2) {
            const modelURL = `${URL.current}model.json`;
            const metadataURL = `${URL.current}metadata.json`;
            
            const model2URL = `${URL2.current}model.json`;
            const metadata2URL = `${URL2.current}metadata.json`;
            
    
            setModel(await window.tmPose.load(modelURL, metadataURL));
            setModel2(await window.tmPose.load(model2URL, metadata2URL));
        }
    }
    

    /*
    *  ready1, ready2 => 팔 내려 자세
    *  set => 팔 벌려 자세
    *  go => 각 4분면 방향으로 팔 올려 자세
    */
    
   const predictJumpingJack = async () => {
       
        if (finishedRef.current) {
            cancelAnimationFrame(loopPredId.current);
            return;
        }
       
        if (model && webcam) {
            await webcam.update();
            const {pose, posenetOutput} = await model.estimatePose(webcam.canvas);
            const prediction = await model.predict(posenetOutput);

            if (!ready1.current &&  prediction[4].probability > 0.85) {
                ready1.current = true;
                console.log("ready1 -> true");
            }
            
            else if (ready1.current && !set.current && prediction[5].probability > 0.85) {
                set.current = true;
                console.log("set -> true");
            }

            else if (ready1.current && set.current && !ready2.current && prediction[4].probability > 0.85) {
                ready2.current = true;
                console.log("ready2 -> true");
            }
            
            else if (predictCheck.current && ready1.current && set.current && ready2.current 
                && prediction[curPose.current].probability > 0.85) {
                setSuccess(true);
                ready1.current = ready2.current = set.current = false;
            }
        }
        loopPredId.current = requestAnimationFrame(predictJumpingJack);
    }



    /*
    * 0 - 손머리위로, 1 - 쿵푸, 2 - 런지, 3 - 러닝
    * 4 - 아래로 숙이기, 5 - 스쿼트, 6 - 던지기
    */

    const predictPictogram = async () => {

        if (finishedRef.current) {
            cancelAnimationFrame(loopPredId.current);
            return;
        }
        console.log("픽토그램 인식 루프");

        if (model && webcam) {
            await webcam.update();
            let poseNum;
            let prediction;
            
            if (curPose.current < 4) {
                const {pose, posenetOutput} = await model.estimatePose(webcam.canvas);
                prediction = await model.predict(posenetOutput);
                poseNum = curPose.current;
            } else {
                const {pose, posenetOutput} = await model2.estimatePose(webcam.canvas);
                prediction = await model2.predict(posenetOutput);
                poseNum = curPose.current % 4;
            }
            console.log(curPose.current, poseNum);

            if (predictCheck.current && prediction[poseNum].probability > 0.85) {
                setSuccess(true);
            }
        }
        loopPredId.current = requestAnimationFrame(predictPictogram);
    }

    const loopPredict = async () => {
        console.log("게임 로직 선택기");
        switch(gameType) {
            case 1:
                setTimeout(() => {
                    predictCheck.current = true;
                    loopPredId.current = requestAnimationFrame(predictJumpingJack);
                }, waitTime.current);
                break;
            case 2:
                setTimeout(() => {
                    predictCheck.current = true;
                    loopPredId.current = requestAnimationFrame(predictPictogram);
                }, waitTime.current);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        
        const init = async () => {
            await initModel();
            setGameLoad(true);
            console.log("GAME LOADED!!!!!!!!!!!!!");
        }

        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps

        return(() => {
            finishedRef.current = true;
        });

    },[]);

    useEffect(() => {
        if (success) {
            console.log("성공 시 콜백 @@@@@@@@@@@@@@@@@@@@@");
            clearTimeout(failTimerId.current);
            
            setCount(prev => prev + 1);
            setSuccess(false);
            
            getNextPose();
        }
    }, [success]);

    useEffect(() => {
        if(fail) {
            console.log("실패 시 콜백 @@@@@@@@@@@@@@@@@@@@@");
            clearTimeout(failTimerId.current);

            setFail(false);

            getNextPose();
        }
    },[fail]);

    useEffect(() => {
        if (started)  {
            console.log("게임 로더 게임 시작 인식함!!!")
            setTimeout(()=> {
                getNextPose();
                loopPredict();
            }, countdown);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[started]);

    useEffect(() => {

        if (finished) {
            console.log("게임 로더 게임 종료 인식함!!!!")
            clearTimeout(failTimerId.current);
            finishedRef.current = true;
        }

    }, [finished]);


    return(
        <div className='jumpingjack'>
            {gameType === 1 && <JumpingJack props={{curPoseState, success, fail, finished}}/>}
            {gameType === 2 && <Pictogram props={{curPoseState, success, fail, started,loadcomplete, finished }}/>}
            {audioPlaying && (<audio src="/music/mosquito_kill.mp3"
            autoPlay
            onEnded={() => setAudioPlaying(false)}
            ></audio>)}
        </div>
    )
}

export default GameLoader;