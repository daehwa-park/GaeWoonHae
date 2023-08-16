import React, { Component, useEffect, useState, useRef } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './Pictogram.css'
// import pictoImg from '../../../../assets/picto/picto1.PNG';

const Pictogram = ({props}) => {
    const curPoseState = props.curPoseState;
    const success = props.success;
    const fail = props.fail;
    const loadcomplete = props.loadcomplete;
    const finish = props.finished;

    // 성공,실패 이미지
    const successImg = '/images/picto/success.png';
    const failImg = '/images/picto/fail.png';
    // 성공 실패 이미지
    const [successType,setSuccessType] = useState(false)
    const [failType,setFailType] = useState(false)
    // 성공 실패 아이콘 보여주는 시간
    const time1 = 1000;
    

    //픽토그램 이미지처리
    const [pictoImageUrl, setPictoImageUrl] = useState(null);
    const [pictoExist, setPictoExist] = useState(false);
    // 픽토그램 애니메이션, 포지션
    const [size, setSize] = useState(30);
    const [size2, setSize2] = useState(25);
    const [top, setTop] = useState(7);
    const [left, setLeft] = useState(37);
    // 픽토그램 중앙에서 보여주는 시간
    const time2 = 3000;

    // 게임시작 
    useEffect(() => {
        if (loadcomplete) {
            console.log('실행시작@@!@!@@@@@@@@@@@@@',loadcomplete);
            setPictoExist(true);
            setTimeout(()=>{
                setSize(15);
                setSize2(10);
                setTop(4);
                setLeft(26);
            },time2)  // waitTime 시간뒤에 픽토그램 애니메이션, 포지션 이동
        }
    },[loadcomplete]);
    // 성공시
    useEffect(() => {
        if (success) {
            let curPose = curPoseState;
            setPictoExist(false); // 픽토그램 제거
            setSuccessType(true);
            setSize(30); // 픽토그램 상태 복귀
            setSize2(25); // 픽토그램 상태 복귀
            setTop(7);
            setLeft(37);
            setTimeout(()=>{   // 1초 뒤에
                setSuccessType(false); // 실패 아이콘 제거
                setPictoExist(true); // 픽토그램 재생성
            },time1)
            setTimeout(()=>{   // 1초 뒤에
                setSize(15);
                setSize2(10);
                setTop(4);
                setLeft(26);
            },time1+time2)
        }
    },[success]);
    // 실패시
    useEffect(() => {
        if (fail) {
            console.log('실패@@@@@@@@@@@@@',fail);
            setPictoExist(false); // 픽토그램 제거
            setFailType(true); // 실패 아이콘
            setSize(30); // 픽토그램 상태 복귀
            setSize2(25); // 픽토그램 상태 복귀
            setTop(4);
            setLeft(37);
            setTimeout(()=>{   // 1초 뒤에
                setFailType(false); // 실패 아이콘 제거s
                setPictoExist(true); // 픽토그램 재생성
            },time1)
            setTimeout(()=>{   // 1초 뒤에
                setSize(15);
                setSize2(10);
                setTop(4);
                setLeft(26);
            },time2)
        }
    },[fail]);

    // 픽토그램 다음 단계
    useEffect(() => {
        if (curPoseState !== undefined) {
            const randomImg = curPoseState
            const newPictoUrl = `/images/picto/picto${randomImg}.PNG`; 
            setPictoImageUrl(newPictoUrl)  // 픽토그램 이미지 갱신
        }        
    }, [curPoseState])


    return (
        <div>
            {!finish ? (
                <div>
                    {pictoExist ? (
                        <div className="picto-imgs" style={{ width: `${size}vw`, height: `${size}vw`,top: `${top}vw`, left: `${left}vw`  }} >
                            <img className="picto-img" style={{ width: `${size2}vw`, height: `${size2}vw` }}  src={pictoImageUrl} alt="" />       
                        </div>
                    ) : null}
        
                    {successType ? (
                        <img className="success-img"   src={successImg} alt="" />       
                        ):null}
                    
        
                    {failType ? (
                        <img className="fail-img"   src={failImg} alt="" />       
                        ):null}
                </div>
            ):null}
               
        </div>
    );
};

export default Pictogram;