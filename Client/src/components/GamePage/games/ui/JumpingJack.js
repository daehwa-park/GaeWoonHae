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

    const curPose = useRef();
    const failImage = useRef();


    useEffect(() => {

    },[]);

    useEffect(() => {
        if (curPoseState) {
            curPose.current = curPoseState;
        }
    },[curPoseState]);

    const motions = [
        "왼쪽 위",
        "오른쪽 위",
        "왼쪽 아래",
        "오른쪽 아래"
    ];

    return (
        <div>
            {/* <Col>
                <Row>
                    <div>
                        <img src={mosquito} ref={normalImages[0]} alt='mos' style={{visibility:'hidden'}} />
                        <img src={mosquito} ref={successImages[0]} alt='mos' style={{visibility:'hidden'}} />
                    </div>
                    <div>
                        <img src={mosquito} ref={normalImages[1]} alt='mos' style={{visibility:'hidden'}} />
                        <img src={mosquito} ref={successImages[1]} alt='mos' style={{visibility:'hidden'}} />
                    </div>
                </Row>
                <Row>
                    <div>
                        <img src={mosquito} ref={normalImages[2]} alt='mos' style={{visibility:'hidden'}} />
                        <img src={mosquito} ref={successImages[2]} alt='mos' style={{visibility:'hidden'}} />
                    </div>
                    <div>
                        <img src={mosquito} ref={normalImages[3]} alt='mos' style={{visibility:'hidden'}} />
                        <img src={mosquito} ref={successImages[3]} alt='mos' style={{visibility:'hidden'}} />
                    </div>
                </Row>
            </Col>
            <img src={mosquito} ref={failImage} style={{visibility:'hidden'}} /> */}
            <h1>현재 동작 : {motions[curPoseState]}</h1>
        </div>
    );
};

export default JumpingJack;