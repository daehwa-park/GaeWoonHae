import VideoApp from '../../features/openvidu_opencv/videoApp.js'
import ChatModal from "../../components/GamePage/ChatModal.js"
import "./Game.css"
import React, {useState} from 'react'


function Game1(){
    // const videoAppRef = useRef();  // videoapp 컴포넌트에 ref생성
    const [leavethisSession] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const showModal = () => {
        setModalOpen(true);
    };


    return (
        <div className='gamepage'>
            {/* <div><img className="timer" src="/images/img/timer.png" alt="dsa" /></div> */}
            <div className="head">
                <span>l l l</span>
                <span className='Logo1'>게운해 </span>
                <span className='Logo2'>GAEWOONHAE</span>
            </div>
            <div className="mainscreen">
                <div className='gametitle'>
                    <h1 className='titlename'>박 터트리기!!</h1>
                    <p >빠르고 정확한 동작으로 더 많이 박을 터트리세요!</p>
                    <hr />
                </div>
                <div className="gamescreen">
                    <div className='messagebtntag'>
                        {/* 채팅 모달창 */}
                            <button className='messagebtn' onClick={showModal}>버튼</button>
                            {modalOpen && <ChatModal className='chatmodal' setModalOpen={setModalOpen} />}
                         
                    </div>
                    <div className="mainvideo">
                        <VideoApp leavethisSession={leavethisSession}/>
                    </div>
                </div>
                <div className="linehr">
                    <hr />
                </div>
            </div>
            <div className="footer"></div>
            {/* <button onClick={handleLeaveSession}> 방 나가기 </button> */}
            {/* <Link to='/main'><button>게임나가기</button></Link> */}
            
        </div>
    )
}

export default Game1