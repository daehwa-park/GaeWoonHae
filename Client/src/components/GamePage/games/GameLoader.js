import React, { Component, useEffect, useRef, useState } from 'react';
import { useSelector } from "react-redux/es/hooks/useSelector";


const GameLoader = ({props}) => {

    // Props
    const setCount = props.setCount;
    const started = props.started;
    const finished = props.finished;
    const gameType = props.gameType;
    const setGameLoad = props.setGameLoad;

    // states
    const [model, setModel] = useState();
    const [webcam, setWebcam] = useState();

    const poseList = useRef([0,1,2,3,4]);

    let URL;
    let loopId;
    let timerId;
    // let poseList = [0,1,2,3,4];
    let poseIndex = 0;

    var ready = false;
    var set = false;
    var go = false;
    
    /*
    * Teachable Machine Settings
    */

    const initModel = async () => {

        switch(2) {
            case 1: 
                URL = 'https://teachablemachine.withgoogle.com/models/ZWOxIpSRc/';
                break;
            case 2: 
                URL = 'https://teachablemachine.withgoogle.com/models/99dOWJKg2/';
                break;
            case 3: 
                URL = 'https://teachablemachine.withgoogle.com/models/4lQr_1IZz/';
                break;
            default:
                URL = 'https://teachablemachine.withgoogle.com/models/M-BMZ7bbw/';
        }

        await setTmModel(URL);

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

    const setTmModel = async(URL) => {
        const modelURL = `${URL}model.json`;
        const metadataURL = `${URL}metadata.json`;

        setModel(await window.tmPose.load(modelURL, metadataURL));
    }
    
    const predictJumpingJack = async () => {
        if (model && webcam) {
            const {pose, posenetOutput} = await model.estimatePose(webcam.canvas);
    
            const prediction = await model.predict(posenetOutput);

            if (!ready && prediction[0].probability > 0.85) {
                ready = true;
                console.log("ready -> true");
            }
            else if (ready && !set && prediction[1].probability > 0.85) {
                set = true;
                console.log("set -> true");
            }
            else if (ready && set  && !go && prediction[0].probability > 0.85) {
                go = true;
                console.log("go -> true");
            }
            else if (go) {
                setCount(prev => prev + 1);
                ready = set = go = false;
                console.log("complete", ready, set, go);
            }
        }
    }

    const predictPictogram = async () => {
        if (model && webcam) {
            const {pose, posenetOutput} = await model.estimatePose(webcam.canvas);
    
            const prediction = await model.predict(posenetOutput);

            if (prediction[poseList.current[poseIndex]].probability > 0.85) {
                setCount(prev => prev + 1);
                poseIndex++;
                
                if(poseIndex == poseList.length){
                    poseIndex = 0;
                }
                console.log(poseIndex);
            }
            else {
                poseIndex = 0;
                console.log(poseIndex);
            }
        }
    }

    const predictSquat = async () => {
        if (model && webcam) {
            const {pose, posenetOutput} = await model.estimatePose(webcam.canvas);
    
            const prediction = await model.predict(posenetOutput);

            if (!ready && prediction[0].probability > 0.85) {
                ready = true;
                console.log("ready -> true");
            }
            else if (ready && !set && prediction[1].probability > 0.85) {
                set = true;
                console.log("set -> true");
            }
            else if (ready && set  && !go && prediction[0].probability > 0.85) {
                go = true;
                console.log("go -> true");
            }
            else if (go) {
                setCount(prev => prev + 1);
                ready = set = go = false;
                console.log("complete", ready, set, go);
            }
        }
    }

    useEffect(() => {
        
        const init = async () => {
            await initModel();
            setGameLoad(true);
            console.log("GAME LOADED!!!!!!!!!!!!!");
        }

        const shuffle = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                  // 무작위로 index 값 생성 (0 이상 i 미만)
              let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
            }
        }

        shuffle(poseList.current);
        console.log(poseList.current);
        init();
    },[])


    useEffect(() => {

        const loop = async () => {
            webcam.update();

            loopId = requestAnimationFrame(loop);
        };

        const predictLoop = async () => {
            
            switch(2) {
                case 1:
                    await predictJumpingJack();
                    requestAnimationFrame(predictLoop);
                    break;
                case 2:
                    timerId = setInterval(() => {
                        console.log("interval");
                        console.log("nextpose", poseList.current[poseIndex]);
                        setTimeout(() => {
                            console.log("ready");
                            setTimeout(()=> {
                                predictPictogram();
                            },3000);
                        }, 2000);
                    }, 5000);
                    break;
                case 3:
                    break;
                default:
                    break;
            }
        }

        if (started)  {
            loop();
            predictLoop();
            console.log("TIMER START!!!!!!!!!!!!!!")
        }

    },[started]);

    useEffect(() => {

        cancelAnimationFrame(loopId);
        clearInterval(timerId);

    }, [finished])

    return(
        <div>
        </div>
    )
}

export default GameLoader;