import React, { Component, useEffect, useRef, useState } from 'react';
import { useSelector } from "react-redux/es/hooks/useSelector";


const GameLoader = ({props}) => {

    // Props
    const setCount = props.setCount;
    const started = props.started;
    const finished = props.finished;
    const gameType = props.gameType;
    const setGameLoad = props.setGameLoad;
    const limitTime = props.limitTime;

    // states
    const [model, setModel] = useState();
    const [webcam, setWebcam] = useState();

    const poseList = useRef([]);
    const currentPose = useRef();

    const URL = useRef("");
    const loopWebcamId = useRef(null);
    const loopPredId = useRef(null);

    // catch mosquito
    const ready1 = useRef(true);
    const ready2 = useRef(false);
    const set = useRef(false);
    const go = useRef(false);


    // const poseList = useRef([0,1,2,3,4]);


    // let squatTimerId;
    // let poseIndex = 0;

    
    // let rightReady = false;
    // let leftReady = false;

    // let ballPos = 0;
    // let startTime;



    const getNextPose = () => {
        let num = currentPose.current;
        
        while(num === currentPose.current) {
            num = poseList.current[Math.floor(Math.random() * poseList.current.length)];
        }

        return num;
    }


    /*
    * Teachable Machine Settings
    */

    const initModel = async () => {

        switch(gameType) {
            case 1: 
                URL.current = 'https://teachablemachine.withgoogle.com/models/ZWOxIpSRc/';
                poseList.current = [0, 1, 2, 3];
                currentPose.current = getNextPose(poseList.current);
                break;
            case 2: 
                URL.current = 'https://teachablemachine.withgoogle.com/models/99dOWJKg2/';
                poseList.current = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                currentPose.current = getNextPose(poseList.current);
                break;
            case 3: 
                URL.current = 'https://teachablemachine.withgoogle.com/models/PP6A_2GsN/';
                break;
            default:
                URL.current = 'https://teachablemachine.withgoogle.com/models/M-BMZ7bbw/';
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
        const modelURL = `${URL.current}model.json`;
        const metadataURL = `${URL.current}metadata.json`;

        setModel(await window.tmPose.load(modelURL, metadataURL));
    }
    

    /*
    *
    *  ready1, ready2 => 팔 내려 자세
    *  set => 팔 벌려 자세
    *  go => 각 4분면 방향으로 팔 올려 자세
    */
    
    const predictJumpingJack = async () => {
        
        if (model && webcam) {
            const {pose, posenetOutput} = await model.estimatePose(webcam.canvas);
            const prediction = await model.predict(posenetOutput);

            if (!ready1.current &&  prediction[4].probability > 0.85) {
                ready1.current = true;
                console.log("ready -> true");
            }
            
            else if (ready1.current && !set.current && prediction[5] > 0.85) {
                set.current = true;
                console.log("set -> true");
            }

            else if (ready1.current && set.current && !ready2.current && prediction[4] > 0.85) {
                ready2.current = true;
                console.log("set -> true");
            }
            
            else if (ready1.current && set.current && ready2.current && prediction[currentPose.current] > 0.85) {
                setCount(prev => prev + 1);
                getNextPose();
                ready1.current = ready2.current = set.current = false;
            }
        }

        loopPredId.current = requestAnimationFrame(predictJumpingJack);
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

    // const predictSquat = async () => {
    //     if (model && webcam) {
    //         const {pose, posenetOutput} = await model.estimatePose(webcam.canvas);
    
    //         const prediction = await model.predict(posenetOutput);

    //         console.log(ballPos, "squat!!");
            

    //         if (ballPos == 0 && !rightReady && prediction[1].probability > 0.85) {
    //             rightReady = true;
    //             console.log("Rready -> true");
    //         }
    //         else if (ballPos == 0 && rightReady && prediction[0].probability > 0.85) {
    //             setCount(prev => prev + 1);
    //             rightReady = false;
    //             console.log("complete 0");
    //         }
    //         else if (ballPos == 1 && !leftReady && prediction[3].probability > 0.85) {
    //             leftReady = true;
    //             console.log("Lready -> true");
    //         }
    //         else if (ballPos == 1 && leftReady && prediction[2].probability > 0.85) {
    //             setCount(prev => prev + 1);
    //             leftReady = false;
    //             console.log("complete 1");
    //         }
    //     }
    // }

    useEffect(() => {
        
        const init = async () => {
            await initModel();
            setGameLoad(true);
            console.log("GAME LOADED!!!!!!!!!!!!!");
        }

        init();
    },[])


    useEffect(() => {

        const loopWebcam = async () => {
            webcam.update();

            loopWebcamId.current = requestAnimationFrame(loopWebcam);
        };

        const loopPredict = async () => {
            switch(gameType) {
                case 1:
                    predictJumpingJack();
                    break;
                case 2:

                    break;

                case 3:

                    break;

                default:
                    break;

            }
        }

        // const predictLoop = async (timestamp) => {
            
        //     switch(gameType) {
        //         case 1:
        //             await predictJumpingJack();
        //             requestAnimationFrame(predictLoop);
        //             break;
        //         case 2:
        //             picTimerId = setInterval(() => {
        //                 console.log("interval");
        //                 console.log("nextpose", poseList.current[poseIndex]);
        //                 setTimeout(() => {
        //                     console.log("ready");
        //                     setTimeout(()=> {
        //                         predictPictogram();
        //                     },3000);
        //                 }, 2000);
        //             }, 5000);
        //             break;
        //         case 3:
        //             if(!startTime) {
        //                 startTime = timestamp;
        //             }

        //             let currentTime = timestamp - startTime;
        //             currentTime = Math.floor(currentTime);
        //             console.log(currentTime);
        //             if(currentTime > 5000) {
        //                 startTime = timestamp;
        //                 ballPos = Math.floor(Math.random() * 2);
        //                 console.log(timestamp - startTime, ballPos);
        //             }
                    
        //             await predictSquat();
        //             requestAnimationFrame(predictLoop);
        //             break;
        //         default:
        //             break;
        //     }
        // }

        if (started)  {
            loopWebcam();
            loopPredict();
            console.log("TIMER START!!!!!!!!!!!!!!")
        }

    },[started]);

    useEffect(() => {

        cancelAnimationFrame(loopWebcamId.current);
        clearInterval(loopPredId.current);
        // clearInterval(squatTimerId);

    }, [finished])

    return(
        <div>
        </div>
    )
}

export default GameLoader;