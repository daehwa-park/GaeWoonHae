import React, { Component, useEffect, useState, useRef } from 'react';
import mosquito from '../../../../assets/game/jumpingjack/mosquito.png'
import deadMosquito from '../../../../assets/game/jumpingjack/deadMosquito.jpg'
import { Col, Row } from 'react-bootstrap';
import { isVisible } from '@testing-library/user-event/dist/utils';
import './JumpingJack.css'

const JumpingJack = ({props}) => {

    const curPoseState = props.curPoseState;
    const success = props.success;
    const fail = props.fail;

    const normalImages = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ];

    const successImages = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ];


    useEffect(() => {
        if (success) {
            let curPose = curPoseState;
            normalImages[curPose].current.style.setProperty('visibility', 'hidden');
            successImages[curPose].current.style.setProperty('visibility', 'visible');
            setTimeout(() => {
                successImages[curPose].current.style.setProperty('visibility', 'hidden');
            }, 500);
        }
    },[success]);

    useEffect(() => {
        if (fail) {
            let curPose = curPoseState;
            normalImages[curPose].current.style.setProperty('visibility', 'hidden');
        }
    },[fail]);

    useEffect(() => {
        if (curPoseState) {
            console.log("모기 이미지 띄우자~~~~~~~~~~~~~~~~~~~~~~~~!@@@@@")
            let curPose = curPoseState;
            normalImages[curPose].current.style.setProperty('visibility', 'visible');
        }        
    }, [curPoseState])

    return (
        <div className="screen-ui">
            <div className="screen-row">
                <div className="img-container">
                    <img className='mosquito-img' src={mosquito} ref={normalImages[0]} alt='mos0' style={{visibility:'visible'}} />
                    <img className='mosquito-img' src={deadMosquito} ref={successImages[0]} alt='deadmos0' style={{visibility:'visible'}} />
                </div>
                <div className="img-container">
                    <img className='mosquito-img' src={mosquito} ref={normalImages[1]} alt='mos1' style={{visibility:'visible'}} />
                    <img className='mosquito-img' src={deadMosquito} ref={successImages[1]} alt='deadmos1' style={{visibility:'visible'}} />
                </div>
            </div>
            <div className="screen-row">
                <div className="img-container">
                    <img className='mosquito-img' src={mosquito} ref={normalImages[2]} alt='mos2' style={{visibility:'visible'}} />
                    <img className='mosquito-img' src={deadMosquito} ref={successImages[2]} alt='deadmos2' style={{visibility:'visible'}} />
                </div>
                <div className="img-container">
                    <img className='mosquito-img' src={mosquito} ref={normalImages[3]} alt='mos3' style={{visibility:'visible'}} />
                    <img className='mosquito-img' src={deadMosquito} ref={successImages[3]} alt='deadmos3' style={{visibility:'visible'}} />
                </div>
            </div>
        </div>
    
    );
};

export default JumpingJack;