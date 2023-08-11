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



    return (
        <div>
            <Col>
                <Row>
                    <div>
                        <img src={mosquito} ref={normalImages[0]} style={isVisible=false} />
                        <img src={mosquito} ref={successImages[0]} style={isVisible=false} />
                    </div>
                    <div>
                        <img src={mosquito} ref={normalImages[1]} style={isVisible=false} />
                        <img src={mosquito} ref={successImages[1]} style={isVisible=false} />
                    </div>
                </Row>
                <Row>
                    <div>
                        <img src={mosquito} ref={normalImages[2]} style={isVisible=false} />
                        <img src={mosquito} ref={successImages[2]} style={isVisible=false} />
                    </div>
                    <div>
                        <img src={mosquito} ref={normalImages[3]} style={isVisible=false} />
                        <img src={mosquito} ref={successImages[3]} style={isVisible=false} />
                    </div>
                </Row>
            </Col>
            <img src={mosquito} ref={failImage} style={isVisible=false} />
        </div>
    );
};

export default JumpingJack;