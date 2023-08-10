import React, {  useEffect, useState } from 'react';
import './CommonUI.css'
// import Timer from "./Timer"
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
// import { useCountdown } from 'react-countdown-circle-timer'

const CommonUI = ({props}) => {

    const count = props.count;
    // const timer = props.timer;
    const timer = 20;
    const userList = props.userList;
    let loadcomplete = props.loadcomplete.current;
    let setFinished = props.setFinished;
    const [timerstart,setTimerstart] =useState(false)

    
    const [sortedUserList, setSortedUserList] = useState([]);
    console.log(sortedUserList)

    useEffect(() => {
        console.log(loadcomplete, '로딩확인@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        if (userList) {
            
            let users = userList.sort((a, b) => (b.count - a.count));
            
            setSortedUserList(users);
            
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userList])

    useEffect(() => {
        console.log(loadcomplete, '로딩확인222@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        if (loadcomplete) {
            console.log(loadcomplete, '로딩확인333@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
            console.log(" 타이머 시작 : @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
            setTimerstart(true)

        }
    }, [loadcomplete])

    return(
        <div>
            <div className='mycount'>
                My count : {count}
            </div>
            <div className='timer' >
                <CountdownCircleTimer
                    isPlaying={timerstart}
                    duration={timer}
                    // duration={timer}
                    colors={['#F4BE66', '#FFA167', '#FD7F32', '#FF0000']}
                    colorsTime={[timer, timer*0.7 , timer*0.4, 0]}
                    size={120}
                    strokeWidth={9}
                    onComplete={() => {
                        props.setFinished(true);
                        console.log(props.finished);
                    }}
                >
                {/* 타이머가 끝났을 때 표시할 내용 */}
                {({ remainingTime }) => (
                    <div>
                        <div className='timer-title'>운동</div>
                        <span className='timer-count'>{remainingTime}</span><span className='timer-sec'>초</span> 
                    </div>
                )}

                </CountdownCircleTimer>
            </div>
                {/* <Timer time={60}/> */}

            {userList.map((user, idx) => (
                <div key={idx}>
                    <div>Rank : {idx}</div>
                    <div>NickName : {user.username}</div>
                    <div>count : {user.count}</div>
                </div>
            ))}
        </div>
    );

}

export default CommonUI;