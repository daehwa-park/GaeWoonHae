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
    let loadcomplete = props.loadcomplete
    // 로딩시간 뒤 타이머 실행
    // const loadingtime = props.loadingtime+props.countdown+1000;
    const [timerstart,setTimerstart] =useState(false)

    
    const [sortedUserList, setSortedUserList] = useState([]);
    console.log(sortedUserList)

    useEffect(() => {
        console.log(loadcomplete.current, '로딩확인@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        if (userList) {
            
            let users = userList.sort((a, b) => (b.count - a.count));
            
            setSortedUserList(users);
            
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userList])

    useEffect(() => {
        console.log(loadcomplete.current, '로딩확인222@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        if (loadcomplete.current) {
            console.log(loadcomplete.current, '로딩확인333@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
            console.log(" 타이머 시작 : @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
            setTimerstart(true)

        }
    }, [loadcomplete.current])

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
                    colors={['rgb(240, 66, 66)', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[7, 5, 2, 0]}
                    size={120}
                    strokeWidth={9}
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