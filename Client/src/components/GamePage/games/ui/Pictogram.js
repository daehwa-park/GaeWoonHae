import React, { Component, useEffect, useState, useRef } from 'react';

const Pictogram = ({props}) => {
    const curPoseState = props.curPoseState;
    const success = props.success;
    const fail = props.fail;

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
        if (curPoseState) {
            let curPose = curPoseState;
        }        
    }, [curPoseState])

    return (
        <div>
        </div>
    );
};

export default Pictogram;