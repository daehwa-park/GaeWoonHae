// import {Link} from 'react-router-dom'
import VideoApp from '../../features/gameroom/videoApp.js'
import "./Game.css"
import React from 'react'

function game1(){
    // const videoAppRef = React.useRef();  // videoapp 컴포넌트에 ref생성
    
    // const handleLeaveSession = () => {
    //     if (videoAppRef.current) {
    //         videoAppRef.current.leaveSession();   //videoapp 컴포넌트에서 leaveSession()
    //     }
    // }
    return (
        <div className='gamepage'>
            <span>l l l</span>
            <span className='Logo1'>게운해 </span>
            <span className='Logo2'>GAEWOONHAE</span>
            <div className="mainscreen">
                <div className='gametitle'>
                    <h1 >박 터트리기!!</h1>
                    <p >빠르고 정확한 동작으로 더 많이 박을 터트리세요!</p>
                    <hr />
                </div>
                <VideoApp/>
                <hr />
            </div>
            {/* <button onClick={handleLeaveSession}>방 나가기</button> */}
        </div>
    )
}

export default game1