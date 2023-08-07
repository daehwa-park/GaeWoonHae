import React, { Component, useEffect, useState } from 'react';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { tmPose } from "@teachablemachine/image"


const JumpingJack = (props) => {

    const count = props.count;
    const setCount = props.setCount;
    const limitTime = props.limitTime;
    const started = props.started;
    const setStarted = props.setStarted;
    const bakHP = 5;
    
    const jumpingJackCheck = () => {
        // 티처블머신으로 자세에 따라 카운트 증가
    }

    console.log(tmPose);


    useEffect(() => {
        if (started) {
            setTimeout(()=> {
                startTimer();
            }, 5000)
        }
    },[started]);

    const startTimer = () => {

    }

    // 박 흔들기
    const jitterBak = () => {

    }


    return(
        <div>

        </div>
    )
}

export default JumpingJack;