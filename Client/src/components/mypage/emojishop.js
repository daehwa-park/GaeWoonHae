import "./emojishop.css";
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
import Emojishop from "../../assets/emoji/emojishop.png";
import ShopOpen from "../../assets/emoji/emojishop_open.png";
import Storetitle from "../../assets/emoji/storetitle.png";

import { useEffect, useState, useRef } from "react";
import { emojiShopAction } from "../../features/Actions/emojiprocessing";
import { useDispatch, useSelector } from "react-redux";
import BuyBtn from "../modal/Buymodal";
import Webcam from "react-webcam";
import {
  loadHaarFaceModels,
  detectHaarFace,
} from "../../features/openvidu_opencv/opencv/haarFaceDetection"; // 얼굴인식 컴포넌트
import cv from "@techstark/opencv-js";


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
  emoji10
];
const Myemojipage = () => {
  // 유저 Id
  const userId = useSelector((state) => state.auth.user.userId);
  // 유저 포인트
  const userPoint = useSelector((state) => state.auth.user.point);
  // 유저 이모지 id
  const userEmojiId = useSelector((state) => state.auth.user.emojiId);
  // 이모지 가격 리스트
  const emojiPriceList = useSelector((state) => state.emoji.emoji.emojiPrice);
  // const nickname = useSelector((state) => state.auth.user.nickname);
  // 구입한 이모지 리스트
  const saveEmoji = useSelector((state) => state.auth.user.saveEmoji) ?? [1];

  const webcamRef = useRef();
  const imgRef = useRef();
  const faceImgRef = useRef();
  const emoji = useRef();
  const selectedEmojiRef = useRef(null);

  // 비디오 종료 조건
  const stopVideo = useRef(false);

  //선택된 이모지 이미지정보
  const [selectedEmoji, setSelectedEmoji] = useState(emoji1);
  //선택된 이모지 id값 - 실행시 유저의 이모지 id값을 가져온다.
  const [selectEmojiId, setSelectEmojiId] = useState(userEmojiId);
  // 선택된 이모지 가격정보
  const [selectPrice, setSelectPrice] = useState(0);
  

  // 이모지 선택시 정보 변경
  const handleEmojiClick = (emoji, num) => {
    setSelectedEmoji(emoji);
    setSelectEmojiId(num+1);
    setSelectPrice(emojiPriceList[num]);

    selectedEmojiRef.current = emoji;
    console.log(emoji,'@@@@@@@@@@@@@@@')
  };

  // 이모지 선택 취소
  const emojiCancel = () => {
    setSelectedEmoji(null);
    setSelectEmojiId(userEmojiId);
    setSelectPrice(0);

    selectedEmojiRef.current = null;
  };

  // 언마운트시에 비디오 종료
  const onUnmount = () => {
    stopVideo.current = true
    console.log('언마운트 성공')
  }

  // 이모지 리스트 서버에 요청
  useEffect(() => {
    emojiShopdata();
    init();
    setSelectedEmoji(emojiArray[selectEmojiId-1])
    
    return onUnmount  

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

          if (selectedEmojiRef.current !== null) {
            emoji.current.src = selectedEmojiRef.current; // 이모지
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

  const dispatch = useDispatch();
  const emojiShopdata = async () => {
    dispatch(emojiShopAction.emojiShopdata());
  };

  //구입 모달
  const [LobbymodalOpen, setLobbyModalOpen] = useState(false);

  // 모달 입장
  const showLobbyModal = () => {
    setLobbyModalOpen(true);
  };

  return (
    <div className="mypage-body2">
      <div className="emoji-shop">
        <h3 className="emoji-title1"><img className="emoji-shop-img" src={Emojishop} alt="" />이모지 상점 </h3>
         {/* {saveEmoji}</h3> */}
        <h3 className="emoji-title2">
          보유 포인트: <span>{userPoint}</span>
          <span><img className="money-img1" src="/images/img/coin.png" alt="My Image" width="20"/></span>
        </h3>
      </div>
      <div className="emoji-body">
        <div className="emoji-left">
            {/* 영상 */}
            <div className="emoji-video">
              <img className="inputImage" alt="input" ref={imgRef} style={{ display: "none" }} />
              <canvas
          
                id="canvas1"
                className="outputImage"
                ref={faceImgRef}
                style={{ width: "22vw", borderRadius: "10px" }}
                
              />
              <img className="emoji" alt="input" ref={emoji} style={{ display: "none" }}></img>
              <Webcam
                ref={webcamRef}
                className="webcam"
                mirrored
                screenshotFormat="image/jpeg"
                style={{ width: "22vw", visibility: "hidden" ,display:"flex", position:"absolute" }}
              />
            </div>
            {/* 이모지 선택 */}
            <div className="select-emoji">
              <div className="pick-emoji">
                <div className="emoji-img">
                  {selectedEmoji ? (
                    <img className="selected-emoji" src={selectedEmoji} alt="" />
                  ) : (
                    <p className="selected-emoji">선택된 이모지가 없어요!</p>
                  )}
                </div>
                <div className="emoji-info">
                  <div className="emoji-id"><span>번호 :</span> <span>{selectEmojiId}</span></div>
                  <div className="emoji-price"><span>가격 :</span> <span>{selectPrice}  
                   <img className="money-img2" src="/images/img/coin.png" alt="My Image" width="18"/>
                  </span></div>
                </div>
              </div>
            </div>
        </div>
        <div className="emoji-right">
          {/* <img className="Storetitle" src={Storetitle} alt="" /> */}
          {/* 이모지 종류 리스트 */}
          <div className="emojishop-bar">
            <div className="emojicomp">
                {emojiArray.map((emoji, index) => (
                  <img
                    key={index}
                    className="emoji-size"
                    src={emoji}
                    onClick={() => handleEmojiClick(emoji, index)}
                    alt=""
                  />
                ))}
            </div>
            {/* <img className="shop-openimg" src={ShopOpen} alt="" /> */}
          </div>
        </div>
      </div>
      <div className="select-button">
        <div className="sellect-btn btnpos" onClick={emojiCancel}>
          취소
        </div>
        <div className="sellect-btn" onClick={() => showLobbyModal()}>
          구입
        </div>
      </div>
      {LobbymodalOpen && (
        <BuyBtn
          userPoint={userPoint}
          userId={userId}
          selectEmojiId={selectEmojiId}
          setModalOpen={setLobbyModalOpen}
          selectPrice={selectPrice}
          EmojiList={saveEmoji}
        />
      )}
    </div>
  );
};

export default Myemojipage;
