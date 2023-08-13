import React, { Component, useEffect, useState, useRef } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './Pictogram.css'


const Pictogram = ({props}) => {
    const curPoseState = props.curPoseState;
    const success = props.success;
    const fail = props.fail;

    //픽토그램 이미지처리
    const randomImg = 1;
    const pictoImg = `/images/picto/picto${randomImg}`;

    // 픽토그램 타이머 시간
    const gameTime2 = 2000;
    //타이머 시작조건
    const timerstart = useRef(false)


    const normalImages = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ];

    useEffect(() => {
        if (fail) {
            let curPose = curPoseState;
        }
    },[fail]);

    useEffect(() => {
        if (curPoseState !== undefined) {
            let curPose = curPoseState;
        }        
    }, [curPoseState])

    return (
        <div>
            <div className={'timer2'} >
                <CountdownCircleTimer
                    isPlaying={timerstart}
                    duration={gameTime2}
                    // duration={timer}
                    colors={['#1e69ff', '#FFA167', '#FD7F32', '#FF0000']}
                    colorsTime={[gameTime2, gameTime2*0.7 , gameTime2*0.4, 0]}
                    size={180}
                    strokeWidth={12}
                    onComplete={() => {
                        props.setFinished(true);
                        console.log(props.finished);
                    }}
                >
                {/* 타이머가 끝났을 때 표시할 내용 */}
                {({ remainingTime }) => (
                    <div >
                        <img src={pictoImg} alt=""/>
                        <div className='timer-title2'>남은 시간 </div>
                        <div className='timer-count2'>{remainingTime}<span className='timer-sec2'>초</span></div> 
                    </div>
                )}

                </CountdownCircleTimer>
            </div>
        </div>
    );
};

export default Pictogram;