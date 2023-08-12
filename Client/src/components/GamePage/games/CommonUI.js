import React, {  useEffect, useState } from 'react';
import './CommonUI.css'
// import Timer from "./Timer"
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
// import { useCountdown } from 'react-countdown-circle-timer'

const CommonUI = ({props}) => {

    const count = props.count;
    // const timer = props.timer;
    const gameTime = props.gameTime;
    const userList = props.userList;
    const gameType = props.gameType;
    let loadcomplete = props.loadcomplete.current;
    let setFinished = props.setFinished;
    // 오류방지
    console.log(setFinished)
    // 타이머 색깔
    const timercolor = gameType===1 ? '#F4BE66': '#1e69ff';

    const [timerstart,setTimerstart] =useState(false)

    const [sortedUserList, setSortedUserList] = useState([]);

    useEffect(() => {
        console.log(gameType,'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        if (userList && userList.length > 0) {
            let users = [...userList];
            console.log(users,"유저 정보 확인")
            users.sort((a, b) => (b.count - a.count));
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
                성공횟수 : {count}
            </div>
            <div className={`timer${gameType}`} >
                <CountdownCircleTimer
                    isPlaying={timerstart}
                    duration={gameTime}
                    // duration={timer}

                    colors={[`${timercolor}`, '#FFA167', '#FD7F32', '#FF0000']}
                    colorsTime={[gameTime, gameTime*0.7 , gameTime*0.4, 0]}
                    size={180}
                    strokeWidth={12}
                    onComplete={() => {
                        props.setFinished(true);
                        console.log(props.finished);
                    }}
                >
                {/* 타이머가 끝났을 때 표시할 내용 */}
                {({ remainingTime }) => (
                    <div >
                        <div className='timer-title'>남은 시간 {gameType}</div>
                        <div className='timer-count'>{remainingTime}<span className='timer-sec'>초</span></div> 
                    </div>
                )}

                </CountdownCircleTimer>
            </div>
                {/* <Timer time={60}/> */}
            <div className={`ranking-list${gameType}`}>
                <div className={`game-ranking-ui${gameType}`}>
                        <div className={`game-ranking1-${gameType}`}>현재 랭킹</div>
                            {/* <div className='ranking2'>
                                1위 : <br/>2위 : <br/>3위 : <br/>4위 : <br/>
                            </div> */}
                        <div className={`game-ranking2-${gameType}`}>
                            {sortedUserList.map((user, idx) => (
                                <div className='user-ranking' key={idx}>{idx}위 {user.username} {user.count}개 </div>
                            ))}
                            {/* <div className='user-ranking'>1위 김두현 12개</div>
                            <div className='user-ranking'>2위 김두현 12개</div>
                            <div className='user-ranking'>3위 김두현 12개</div> */}
                        </div>
                        
                </div>
            </div>
            <div className={`picto${gameType}`}>
                픽토그램 이미지
            </div>
        </div>
    );

}

export default CommonUI;
