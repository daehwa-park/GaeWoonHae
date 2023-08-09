import './countloading.css'
import React, { useState, useEffect } from 'react';
// import React, { useEffect, useState, useRef } from 'react';

const CountLoading =({countdown}) => {

    const [time, setTime] = useState(3);
    const [animate, setAnimate] = useState(false);
    // 숫자 카운트 딜레이
    const countdelay = 900

    useEffect(() => {
        if (time >= 0) {
            const timerId = setTimeout(() => {
                setTime(prevTime => prevTime - 1);
                setAnimate(true);
            }, countdelay);
            return () => clearTimeout(timerId);
        }
    }, [time]);

    useEffect(() => {
        if (animate) {
            const animationTimeout = setTimeout(() => {
                setAnimate(false);
            }, countdelay); // 애니메이션 지속시간과 타이밍 조절
            return () => clearTimeout(animationTimeout);
        }
    }, [animate]);

    return (
        <div className="count-loader">
            <div className={`count-time ${animate ? 'count-animate' : ''}`}>
                {time !== -1 ? time : '게임시작!'}
            </div>
            <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                {time ? time : <div>카운트 다운 종료</div>}
            </div>
        </div>
    )
}

export default CountLoading