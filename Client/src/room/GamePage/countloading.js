import './countloading.css'
import React, { useState, useEffect } from 'react';
// import React, { useEffect, useState, useRef } from 'react';

const CountLoading =({updateLoadingComplete}) => {

    const [time, setTime] = useState(3);
    const [animate, setAnimate] = useState(false);
    // 숫자 카운트 딜레이
    const countdelay = 1000

    useEffect(() => {
        if (time > 0) {
            const timerId = setTimeout(() => {
                setTime(prevTime => prevTime - 1);
                setAnimate(true);
            }, countdelay);
            return () => clearTimeout(timerId);
        }
        else {
            updateLoadingComplete();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                {time !== 0 ? (
                    <div>{time}</div>
                ) : (
                    <div>게임시작!</div>
                )}
            </div>
        </div>
    )
}

export default CountLoading