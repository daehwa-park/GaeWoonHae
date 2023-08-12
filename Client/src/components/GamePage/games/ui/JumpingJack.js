import React, { Component, useEffect, useState, useRef } from 'react';
import mosquito from '../../../../assets/game/jumpingjack/mosquito.png'
import { Col, Row } from 'react-bootstrap';
import { isVisible } from '@testing-library/user-event/dist/utils';
const JumpingJack = ({props}) => {

    const setAssetLoad = props.setAssetLoad;
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
        <div>
            <Col>
                <Row>
                    <div>
                        <img src={mosquito} ref={normalImages[0]} alt='mos0' style={{visibility:'visible'}} />
                        <img src={mosquito} ref={successImages[0]} alt='deadmos0' style={{visibility:'hidden'}} />
                    </div>
                    <div>
                        <img src={mosquito} ref={normalImages[1]} alt='mos1' style={{visibility:'hidden'}} />
                        <img src={mosquito} ref={successImages[1]} alt='deadmos1' style={{visibility:'hidden'}} />
                    </div>
                </Row>
                <Row>
                    <div>
                        <img src={mosquito} ref={normalImages[2]} alt='mos2' style={{visibility:'hidden'}} />
                        <img src={mosquito} ref={successImages[2]} alt='deadmos2' style={{visibility:'hidden'}} />
                    </div>
                    <div>
                        <img src={mosquito} ref={normalImages[3]} alt='mos3' style={{visibility:'hidden'}} />
                        <img src={mosquito} ref={successImages[3]} alt='deadmos3' style={{visibility:'hidden'}} />
                    </div>
                </Row>
            </Col>
        </div>
    );
};

export default JumpingJack;