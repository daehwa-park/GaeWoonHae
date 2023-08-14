import React, { Component, useEffect, useState, useRef } from 'react';
import livemosquito from '../../../../assets/game/jumpingjack/mosquito2.png'
import deadMosquito from '../../../../assets/game/jumpingjack/mosquito1.png'
import { Col, Row } from 'react-bootstrap';
import { isVisible } from '@testing-library/user-event/dist/utils';
import './JumpingJack.css'

const JumpingJack = ({props}) => {

    const curPoseState = props.curPoseState;
    const success = props.success;
    const fail = props.fail;

    const [deadstate,setDeadstate] =useState(false)
    const [kill1,setKill1] =useState(false)
    const [kill2,setKill2] =useState(false)
    const [kill3,setKill3] =useState(false)
    const [kill4,setKill4] =useState(false)
    const mosquito1 =!kill1 ? livemosquito : deadMosquito ;
    const mosquito2 =!kill2 ? livemosquito : deadMosquito ;
    const mosquito3 =!kill3 ? livemosquito : deadMosquito ;
    const mosquito4 =!kill4 ? livemosquito : deadMosquito ;

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
            setDeadstate(curPoseState+1)
            if(curPoseState===0) {
                setKill1(true)
            } else if(curPoseState===1) {
                setKill2(true)
            } else if(curPoseState===2) {
                setKill3(true)
            } else if(curPoseState===3) {
                setKill4(true)
            }

            // let curPose = curPoseState;
            // normalImages[curPose].current.style.setProperty('display', 'none');
            // successImages[curPose].current.style.setProperty('display', 'block');
            setTimeout(() => {
                setDeadstate(0)
            }, 2000);
        }
    },[success]);

    useEffect(() => {
        if (fail) {
            let curPose = curPoseState;
            // normalImages[curPose].current.style.setProperty('display', 'none');
        }
    },[fail]);

    useEffect(() => {
        let curPose = curPoseState;
        if (curPoseState !== undefined) {
            console.log("모기 이미지 띄우자~~~~~~~~~~~~~~~~~~~~~~~~!@@@@@",curPoseState)  
            setKill1(false)
            setKill2(false)
            setKill3(false)
            setKill4(false)

        }        
    }, [curPoseState])

    return (
        <div className="screen-ui">
            <div className="screen-row">
                <div className="img-container">
                    {curPoseState === 0 || deadstate===1 ? (
                        <img className={`mosquito-img mos-1 ${curPoseState === 0 && !kill1 ? 'active' : ''} ${kill1 ? 'dead' : ''}`} src={mosquito1} alt=""/>
                    
                   ) : null}
                   </div>
                <div className="img-container">
                    {curPoseState === 1 || deadstate===2 ? (
                         <img className={`mosquito-img mos-2 ${curPoseState === 1 && !kill2 ? 'active' : ''} ${kill2 ? 'dead' : ''}`} src={mosquito2} alt="" />
                   ) : null}
                   </div>
            </div>
            <div className="screen-row">
                <div className="img-container">
                    {curPoseState === 2 || deadstate===3 ? (
                   <img className={`mosquito-img mos-3 ${curPoseState === 2 && !kill3 ? 'active' : ''} ${kill3 ? 'dead' : ''}`} src={mosquito3} alt="" />
                   ) : null}
                </div>
                <div className="img-container">
                    {curPoseState === 3 || deadstate===4 ? (
                   <img className={`mosquito-img mos-4 ${curPoseState === 3 && !kill4 ? 'active' : ''} ${kill4 ? 'dead' : ''}`} src={mosquito4} alt="" />
                   ) : null}
                </div>
            </div>
        </div>
    
    );
};

export default JumpingJack;
