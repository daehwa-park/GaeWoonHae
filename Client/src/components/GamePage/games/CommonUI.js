import React, {  useEffect, useState } from 'react';
import './CommonUI.css'
// import Timer from "./Timer"
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
// import { useCountdown } from 'react-countdown-circle-timer'
import first from '../../../assets/ranking/first.png'
import second from '../../../assets/ranking/second.png'
import third from '../../../assets/ranking/third.png'

const CommonUI = ({props}) => {

    
    const count = props.count;
    const gameType = props.gameType;
    // const timer = props.timer;
    const gameTime = props.gameTime;
    const userList = props.renderingUserList;
    let loadcomplete = props.loadcomplete.current;
    let setFinished = props.setFinished;
    

    // 타이머 색깔
    const timercolor = '#F4BE66';

    const [timerstart,setTimerstart] =useState(false)

    useEffect(() => {
        if (loadcomplete) {
            console.log(loadcomplete, '로딩확인@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
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
                        console.log("타이머 끝나서 콜백함수 실행됨~~~")
                        setFinished(true);
                    }}
                >
                {/* 타이머가 끝났을 때 표시할 내용 */}
                {({ remainingTime }) => (
                    <div >
                        <div className='timer-title'>남은 시간</div>
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
                                <div className='user-ranking' key={idx}>
                                    {sortedUserList.length ===1 && (
                                        <img className='user-rank1' src={first} alt="" />
                                    )}
                                    {sortedUserList.length ===2 && (
                                        <div>
                                            <img className='user-rank1' src={first} alt="" />
                                            <img className='user-rank2' src={second} alt="" />
                                        </div>
                                    )}
                                    {sortedUserList.length ===3 && (
                                        <div>
                                            <img className='user-rank1' src={first} alt="" />
                                            <img className='user-rank2' src={second} alt="" />
                                            <img className='user-rank3' src={third} alt="" />
                                        </div>
                                    )}
                                    {idx+1}위 {user.username} {user.count}개 
                                </div>
                            ))}
                            {/* <div className='user-ranking'>1위 김두현 12개</div>
                            <div className='user-ranking'>2위 김두현 12개</div>
                            <div className='user-ranking'>3위 김두현 12개</div> */}
                        </div>
                        
                </div>
            </div>
            {/* {gameType ===2 ? (
                <div className={`picto${gameType}`}>
                    <img src={pictoImg} alt=""/>
                </div>
            ) : null } */}
        </div>
    );

}

export default CommonUI;
