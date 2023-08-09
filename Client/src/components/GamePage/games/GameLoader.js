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
    const [poseList, setPoseList] = useState([]);
    const [targetList, setTargetList] = useState([]);

    let step = 0;
    let isPosing = false;

    // catch mosquito
    let ready = false;
    let set = false;


    // const poseList = useRef([0,1,2,3,4]);

    let URL;
    let loopWebcamId;
    let loopPredId;
    let squatTimerId;
    let poseIndex = 0;

    
    let rightReady = false;
    let leftReady = false;

    let ballPos = 0;
    let startTime;



    const randomNumbers = () => {
        let arr = [];
        let num;

        if (gameType === 1) {
            while (arr.length <= limitTime/2) {
                num = Math.floor(Math.random()*4);
                if (!arr || arr[-1] !== num) {
                    arr.push(num);
                }
            }

        } else if (gameType === 2) {
            while (arr.length <= limitTime/5) {
                num = Math.floor(Math.random()*10);
                if (!arr || arr[-1] !== num) {
                    arr.push(num);
                }
            }
        }
        return arr;
    }


    /*
    * Teachable Machine Settings
    */

    const initModel = async () => {

        switch(gameType) {
            case 1: 
                URL = 'https://teachablemachine.withgoogle.com/models/ZWOxIpSRc/';
                setPoseList([0, 1, 2, 3]);
                setTargetList(randomNumbers());
                break;
            case 2: 
                URL = 'https://teachablemachine.withgoogle.com/models/99dOWJKg2/';
                setPoseList([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
                setTargetList(randomNumbers());
                break;
            case 3: 
                URL = 'https://teachablemachine.withgoogle.com/models/PP6A_2GsN/';
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

            if (!set &&  prediction[0].probability > 0.85) {
                set = true;
                console.log("set -> true");
            }
            
            else if (set && !ready2 && prediction[1] > 0.85) {
                ready2 = true;
                console.log("ready2 -> true");
            }

            


            else if (set && ready2 && !go && prediction[2].probability > 0.85) {
                go = true;
                console.log("go -> true");
            }
            else if (go) {
                setCount(prev => prev + 1);
                ready2 = set = go = false;
                console.log("complete", set, ready2, go);
            }
        }
    }

    // const predictPictogram = async () => {
    //     if (model && webcam) {
    //         const {pose, posenetOutput} = await model.estimatePose(webcam.canvas);
    
    //         const prediction = await model.predict(posenetOutput);

    //         if (prediction[poseList.current[poseIndex]].probability > 0.85) {
    //             setCount(prev => prev + 1);
    //             poseIndex++;
                
    //             if(poseIndex == poseList.length){
    //                 poseIndex = 0;
    //             }
    //             console.log(poseIndex);
    //         }
    //         else {
    //             poseIndex = 0;
    //             console.log(poseIndex);
    //         }
    //     }
    // }

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

            loopWebcamId = requestAnimationFrame(loopWebcam);
        };

        const loopPredict = async () => {
            switch(gameType) {
                case 1:
                    loopPredId = setTimeout(() => {




                    })
                    break;
                case 2:

                case 3:

                default:

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

        cancelAnimationFrame(loopWebcamId);
        clearInterval(loopPredId);
        // clearInterval(squatTimerId);

    }, [finished])

    return(
        <div>
        </div>
    )
}

export default GameLoader;