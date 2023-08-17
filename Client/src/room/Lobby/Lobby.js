import React, { useEffect, useState, useRef } from "react";

import "./Lobby.css";
import { Container, Row, Col, Card } from "react-bootstrap/";
import { useSelector } from "react-redux/es/hooks/useSelector";
import LobbyClose from "../../components/modal/LobbyClose";
import Chatting from "../../features/chatting/Chatting";
import GameRoomInfoStart from "../../components/GamePage/GameRoomInfoStart";
import logo from "../../assets/img/purple_logo.png";
import LimitTime from "../../components/GamePage/LimitTime";
// 대기방 - 박 터트리기

import lobbyEmoji1 from "../../assets/emoji/lobby_emoji1.png";
import Webcam from "react-webcam";
import {
  loadHaarFaceModels,
  detectHaarFace,
} from "../../features/openvidu_opencv/opencv/haarFaceDetection"; // 얼굴인식 컴포넌트
import cv from "@techstark/opencv-js";
import ChangeEmo from '../../components/modal/ChangeEmoji'

import emoji1 from "../../assets/emoji/emoji1.png";
import emoji2 from "../../assets/emoji/emoji2.png";
import emoji3 from "../../assets/emoji/emoji3.png";
import emoji4 from "../../assets/emoji/emoji4.png";
import emoji5 from "../../assets/emoji/emoji5.png";
import emoji6 from "../../assets/emoji/emoji6.png";
import emoji7 from "../../assets/emoji/emoji7.png";
import emoji8 from "../../assets/emoji/emoji8.png";
import emoji9 from "../../assets/emoji/emoji9.png";
import emoji10 from "../../assets/emoji/emoji10.png";
import emojix from "../../assets/emoji/emojix.png";

import {edituserinfo} from '../../features/Actions/edituserinfo'
import { useDispatch } from "react-redux";
import { emojiShopAction } from '../../features/Actions/emojiprocessing'
const Lobby = () => {
  const firstUseremoji = useSelector(state => state.auth.user.emojiId);

  const [selectId,setSelectId] =useState(firstUseremoji)
  // const [useremojiId,setUseremojiId] =useState(firstUseremoji)
  const useremojiId =useRef(firstUseremoji)

  const [modalOpen, setModalOpen] = useState(false);

  const webcamRef = useRef();
  const imgRef = useRef();
  const faceImgRef = useRef();
  const emoji = useRef();
  const stopVideo = useRef(false);

  const [showMessage, setShowMessage] = useState(false);
  const [showMessage2, setShowMessage2] = useState(false);
  const [showMessage3, setShowMessage3] = useState(false);

  const emojiArray = [
    emoji1,
    emoji2,
    emoji3,
    emoji4,
    emoji5,
    emoji6,
    emoji7,
    emoji8,
    emoji9,
    emoji10,
  ];
// 구입한 이모지 리스트
const saveEmoji = useSelector((state) => state.auth.user.saveEmoji) ?? [1];
// 선택한 이모지 id
const [emojiId, setEmojiId] = useState(1)
const userId = useSelector((state) => state.auth.user.userId);
// 모달 끄기 
const closeModal = () => {
    setModalOpen(false);
    setLobbyModalOpen2(false)
};


const dispatch = useDispatch();
const emojiSellect = async() => {
  dispatch(emojiShopAction.applyEmoji(userId, emojiId));
  setSelectId(emojiId);
  closeModal();
}
const emojiList = async(userId) => {
    console.log('리스트 가져오기')
    dispatch(edituserinfo.getEmojiList(userId));
}

useEffect(()=> {
    const fetchData = async () => {
        await emojiList(userId)
        console.log(saveEmoji,'@@@@@@@@@')
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[])
//선택된 이모지 이미지정보
const [selectedEmoji, setSelectedEmoji] = useState(null);
//선택된 이모지 id값 - 실행시 유저의 이모지 id값을 가져온다.
// const [selectEmojiId, setSelectEmojiId] = useState(userEmojiId);

// 이모지 선택시 정보 변경
const handleEmojiClick = (emoji,num) => {
    setSelectedEmoji(emoji);
    setEmojiId(num)
    // setSelectEmojiId(num);
    console.log(1)
};     

const getEmoji = (emojiId) => {
    switch (emojiId) {
        case emojiId:
          return emojiArray[emojiId-1];

        default:
          return ""; 
      }
    };

    // 언마운트시에 비디오 종료
    const onUnmount = () => {
      stopVideo.current = true
      console.log('언마운트 성공')
    }
  
    // useEffect(()=>{
    //   setFirstemoji
    // },[])
    useEffect(()=>{
      useremojiId.current=selectId
      // console.log('바뀐거 확인',useremojiId,selectId)
      
    },[selectId])

    // 이모지 리스트 서버에 요청
    useEffect(() => {
      init();
  
      return onUnmount  
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

  
    useEffect(()=>{
      const timer = setTimeout(() => {
        setShowMessage(true);
      }, 3000);
      const timer2 = setTimeout(() => {
        setShowMessage2(true);
      }, 5000);
      const timer3 = setTimeout(() => {
        setShowMessage3(true);
      }, 7000);
    },[]);

    const init = async () => {
      await loadHaarFaceModels(); //opencv : 학습 데이터 import
      nextTick();
      console.log("init실행")
    };
  
    const nextTick = () => {
      detectFace(); // 2번함수 실행
      if (!stopVideo.current) {
        requestAnimationFrame(async () => {
          nextTick(); // 반복
        })
      } else {
        console.log('종료',stopVideo.current)
      }
    };
  
    const detectFace = () => {
      if (!webcamRef.current) return;
      const imageSrc = webcamRef.current.getScreenshot(); // 웹캠 화면 캡쳐
      if (!imageSrc) return;
  
      return new Promise((resolve) => {
        imgRef.current.src = imageSrc;
        imgRef.current.onload = async () => {
          try {
            const img = cv.imread(imgRef.current);

            if(useremojiId.current !== 11){
              emoji.current.src = `../../images/emoji/emoji${useremojiId.current}.png`; // 이모지
              const emo = cv.imread(emoji.current);
              detectHaarFace(img, emo); // opencv : loadHaarFaceModels()로 화면인식을 학습 => 포인트에 이모지 씌우기
            }

            cv.imshow(faceImgRef.current, img);
  
            img.delete(); // 이미지 초기화
            resolve();
          } catch (error) {
            console.log(error, "detectFace() 에러");
            resolve();
          }
        };
      });
    };
  
  const gameNameList = [
    "짝짝! 모기 잡아라!!",
    "도전! 픽토그램!",
  ];


  const [num, setNum] = useState(0);
  const [userList, setUserList] = useState([]);
  const refUserList = useRef([]);

  useEffect(() => {
    console.log("나 유저리스트야", refUserList.current);
  }, [refUserList.current]);

  const gameType = useSelector((state) => state.roomInfo.gameType);
  const sessionId = useSelector((state) => state.roomInfo.sessionId);
  const gameName = gameNameList[gameType - 1];

  const [LobbymodalOpen2, setLobbyModalOpen2] = useState(false);
  
  const updateUserList = (userlist) => {
    refUserList.current = userlist;
    console.log(refUserList.current, "lobbyupdate");
    plusOne();
  }

  const plusOne = () => {    
    setNum(prev => prev + 1);
  }
  const [showCode, setShowCode] = useState(false);

  const handleMouseEnter = () => {
    setShowCode(true);
  };

  const handleMouseLeave = () => {
    setShowCode(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(sessionId);
    alert("초대코드가 복사되었습니다!");
    setShowCode(false);
  };

  const showLobbyModal2 = () => {
    setLobbyModalOpen2(true);
  };


  return (
    <div className="lobby-body">
      {LobbymodalOpen2 && 
      
      <div className="modal-container">

          <div id='changemodals'>
              <h3 id='codetxt7'>이모지 변경하기</h3>
              <div className='changeemoji-text'>내가 보유중인 이모지 :</div>
              <div className='emoji-box2'>
                  {/* <div className='emoji-img2' >{selectedEmoji ? <img className='selected-emoji' src={selectedEmoji} alt='' /> : '구입한 이모지가 없습니다.'}</div> */}
                  <div className='emojicomp2'>
                      <img className='emoji-size2' src={emojix} onClick={() => handleEmojiClick(emojix,11)} alt=""/>
                      {saveEmoji.map((emojiId)=>(
                          <img className='emoji-size2' src={getEmoji(emojiId)} onClick={() => handleEmojiClick(getEmoji(emojiId),emojiId)} alt=""/>
                      ))}
                  {/* <img className='emoji-size' src={emoji2} onClick={() => handleEmojiClick(emoji2,2)} alt=""/>
                  <img className='emoji-size' src={emoji3} onClick={() => handleEmojiClick(emoji3,3)} alt=""/> */}
                  </div>
                
              </div>
              <div className='select-emoji-change'>현재 선택한 이모지 : <br/>{selectedEmoji ? <img className='selected-emoji' src={selectedEmoji} alt=''/> : '선택한 이모지가 없습니다.'}</div>

          
              <div id='changemodal'>
                  <p id='changebutton' onClick={emojiSellect}>적용</p>
                  <p id='changebutton' onClick={closeModal}>취소</p>
              </div>
          </div>
      </div>
      }
    <div className="navbar-lobby">
      <img className="main-hover" src={logo} alt="" />
      <div
        className={`invitation-code ${showCode ? "hovered" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showCode ? (
          <>
            <div onClick={handleCopy}>
              <span >
                코드 :
              </span>
              {sessionId}{" "}
            </div>
            {/* <button className="code-copy" onClick={handleCopy}>
              복사하기
            </button> */}
          </>
        ) : (
          "초대코드 보내기"
        )}
      </div>
    </div>
      <div className="lobby-main">
      {modalOpen && (<LobbyClose setModalOpen={setModalOpen}/>)}
          <div>
          <div className="title-row">
            <div className="title-box">
              <h1>{gameName}</h1>
            </div>
          </div>
          <div className="lobby-room">
            <div className="lobby-left">
              <div className="lobby-user">
                {/* <div>{userList && userList[0].username}</div> */}
                <GameRoomInfoStart
                  userList={userList}
                  refUserList={refUserList}
                />
                <div className="setting-emoji" onClick={()=>showLobbyModal2()}>이모지 변경하기</div>
              </div>
            </div>
            <div className="lobby-video">
              <div>
                <div className="lobbyemoji-video">
                  {/* <img className="lobbyemoji" src={lobbyEmoji1} alt="" /> */}
                  <div className='lobbyvideo-control'>
                    <img className="lobby-inputImage" alt="input" ref={imgRef} style={{ display: "none" }} />
                    <canvas
                      id="canvas1"
                      className="lobby-outputImage"
                      ref={faceImgRef}
                      style={{ borderRadius: "10px"}}
                      
                    />
                    <img className="lobbyemoji" alt="input" ref={emoji} style={{ display: "none" }}></img>
                    <Webcam
                      ref={webcamRef}
                      className="webcam"
                      mirrored
                      screenshotFormat="image/jpeg"
                      style={{ width: "360px", visibility: "hidden" ,display:"flex", position:"absolute" }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="lobby-message">
                  <div className="lobby-msgbox"></div>
                  <div className={`lobby-message1 ${showMessage ? 'show' : ''}`}>대기하는동안 화면을 조정해보세요.</div>
                  <div className="lobby-message23">
                    <div className={`lobby-message2 ${showMessage2 ? 'show' : ''}`}>플레이시간과 원하는 이모지를 선택했다면, <div className={`lobby-message3 ${showMessage3 ? 'show' : ''}`}>레츠 고 !!</div></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="chat-col">
              <div className="chat-name">채팅창</div>
              <Chatting setModalOpen={setModalOpen} setUserList={setUserList} updateUserList={updateUserList} />
            </div>
          </div>
          </div>
      </div>
    </div>
  );
};

export default Lobby;