import React, { Component, useEffect, useState, useRef } from 'react';
import livemosquito from '../../../../assets/game/jumpingjack/mosquito2.png'
import deadMosquito from '../../../../assets/game/jumpingjack/mosquito1.png'
import { Col, Row } from 'react-bootstrap';
import { isVisible } from '@testing-library/user-event/dist/utils';
import './JumpingJack.css'

const JumpingJack = ({props}) => {

    const curPoseState = props.curPoseState;
    const success = props.success;
    const finish = props.finished;

    const [deadstate,setDeadstate] =useState(false)
    const [kill1,setKill1] =useState(false)
    const [kill2,setKill2] =useState(false)
    const [kill3,setKill3] =useState(false)
    const [kill4,setKill4] =useState(false)
    const mosquito1 =!kill1 ? livemosquito : deadMosquito ;
    const mosquito2 =!kill2 ? livemosquito : deadMosquito ;
    const mosquito3 =!kill3 ? livemosquito : deadMosquito ;
    const mosquito4 =!kill4 ? livemosquito : deadMosquito ;

    const [marginLeft,setMarginLeft] =useState(0)
    const [marginTop,setMarginTop] =useState(0)

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
        // const newPositions = positions.map((position) => ({
        //     x: Math.random() * (window.innerWidth - 0.1 * window.innerWidth),
        //     y: Math.random() * (window.innerHeight - 0.1 * window.innerHeight), 
        //   }));
        //   setPositions(newPositions);

        if (curPoseState !== undefined) {
            const marginLeft= `${Math.random() * 10}vw`; // 0vw ~ 20vw 범위에서 랜덤 값
            const marginTop= `${Math.random() * 10}vw`;
            setMarginLeft(marginLeft)
            setMarginTop(marginTop)
            // setPositions([marginLeft,marginTop])
            console.log("모기 이미지 띄우자~~~~~~~~~~~~~~~~~~~~~~~~!@@@@@",curPoseState)
            if (deadstate===1) {
                setKill2(false)
                setKill3(false)
                setKill4(false)
                setTimeout(()=>{
                    setKill1(false)
                },2000)
            }  else if (deadstate===2) {
                setKill1(false)
                setKill3(false)
                setKill4(false)
                setTimeout(()=>{
                    setKill2(false)
                },2000)
            } else if (deadstate===3) {
                setKill1(false)
                setKill2(false)
                setKill4(false)
                setTimeout(()=>{
                    setKill3(false)
                },2000)
            } else if (deadstate===4) {
                setKill1(false)
                setKill2(false)
                setKill3(false)
                setTimeout(()=>{
                    setKill4(false)
                },2000)
            }
        }        
    }, [curPoseState])

    return (
        <div className="screen-ui">
            {!finish ? (
                <div>
                    <div className="screen-row">
                        <div className="img-container">
                            
                            {curPoseState === 0 || deadstate===1 ? (
                                <img className={`mosquito-img mos-1 ${curPoseState === 0 && !kill1 ? 'active' : ''} ${kill1 ? 'dead' : ''}`}  style={{marginLeft:marginLeft,marginTop:marginTop}} src={mosquito1} alt=""/>
                            
                        ) : null}
                        </div>
                        <div className="img-container">
                            
                            {curPoseState === 1 || deadstate===2 ? (
                            <img className={`mosquito-img mos-2 ${curPoseState === 1 && !kill2 ? 'active' : ''} ${kill2 ? 'dead' : ''}`} style={{marginLeft:marginLeft,marginTop:marginTop}} src={mosquito2} alt="" />
                        ) : null}
                        </div>
                    </div>
                    <div className="screen-row">
                        <div className="img-container">
                           
                            {curPoseState === 2 || deadstate===3 ? (
                        <img className={`mosquito-img mos-3 ${curPoseState === 2 && !kill3 ? 'active' : ''} ${kill3 ? 'dead' : ''}`} style={{marginLeft:marginLeft,marginTop:marginTop}} src={mosquito3} alt="" />
 
                        ) : null}
                        </div>
                        <div className="img-container">
                           
                            {curPoseState === 3 || deadstate===4 ? (
                        <img className={`mosquito-img mos-4 ${curPoseState === 3 && !kill4 ? 'active' : ''} ${kill4 ? 'dead' : ''}`} style={{marginLeft:marginLeft,marginTop:marginTop}} src={mosquito4} alt="" />
                        ) : null}
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    
    );
};

export default JumpingJack;
