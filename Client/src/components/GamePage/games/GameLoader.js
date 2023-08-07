import React, { Component, useEffect, useState } from 'react';
import { useSelector } from "react-redux/es/hooks/useSelector";


const GameLoader = (props) => {

    // Props
    const count = props.count;
    const setCount = props.setCount;
    const limitTime = props.limitTime;
    const started = props.started;
    const setStarted = props.setStarted;
    const finshed = props.finished;
    const setFinished = props.setFinished;
    const gameType = props.gameType;

    // states
    const [objectHP, setObjectHP] = useState(5);
    const [model, setModel] = useState();
    const [webcam, setWebcam] = useState();
    const [timer, setTimer] = useState();

    let ready;
    let done;

    
    /*
    * Teachable Machine Settings
    */
    const setTmModel = async(URL) => {
        const modelURL = `${URL}model.json`;
        const metadataURL = `${URL}metadata.json`;
        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // Note: the pose library adds a tmPose object to your window (window.tmPose)
        setModel(await window.tmPose.load(modelURL, metadataURL));
    }

    const init = async () => {
        // Convenience function to setup a webcam
        const size = 200;
        const flip = true; // whether to flip the webcam
        setWebcam(new window.tmPose.Webcam(size, size, flip)); // width, height, flip
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
        await predict();
        window.requestAnimationFrame(loop);
    };

    const predictJumpingJack = async () => {
        if (model && webcam) {
            const {pose, posenetOutput} = await model.estimatePose(webcam.canvas);
    
            const prediction = await model.predict(posenetOutput);
    
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
                setCount(prev => prev + 1);
                ready = false;
                done = false;
            }
        }
    }

    
    useEffect(() => {

        let URL;

        switch(gameType) {
            case 1:
                break;
            default:
                break;
        }

        setTmModel(URL);
 
    },[])


    // 5초 카운터 (시각적 타이머도 함꼐)
    useEffect(() => {
        const startTimer = () => {

        }

        if (started) {
            setTimeout(()=> {
                startTimer();
            }, 5000)
        }
    },[started]);

    return(
        <div>

        </div>
    )
}

export default GameLoader;