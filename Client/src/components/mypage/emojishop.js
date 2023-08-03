import './emojishop.css'
import emoji1 from '../../assets/emoji/emoji_1.png'
import emoji2 from '../../assets/emoji/emoji_2.png'
import emoji3 from '../../assets/emoji/emoji_3.png'
import { useState } from 'react'

const Myemojipage = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };     


  // const buyemoji = async () => {
  //   const requestData = {
  //     gameType: 1,
  //   };
  //   await dispatch(emojishop.getSessionId(requestData));
  // };
  



    // const [pageNumber, setPageNumber] = useState(0);

    // const returnMyPage = () => {
    //   setPageNumber(0);
    //   console.log(userId,useremoji,userpoint,nickname)
    // };
    // const goEmojiPage = () => {
    //   setPageNumber(1);
    // };
  
    // const lobbyapi = axios.create({
    //     baseURL: process.env.REACT_APP_SPRING_URI,
    //     headers: { "cotent-type": "application/json" },
    //   })

    // const emojishop = async(dispatch) => {
    //     // dispatch(findRoomRequest());

    //     // 전체 이모지 정보
    //     try {
    //         const res = await lobbyapi.get("/api/emoji/store", 
    //         );
    //         console.log(res.data)
    //       } catch (error) {
    //         console.log(error, "요청실패");
    //     }

    //     // 유저 닉네임, 이모지 정보, 포인트
    //     try {
    //         const res = await lobbyapi.get("/api/user/userinfo/1", 
    //         );
    //         console.log(res.data)
    //         console.log("유저정보")
    //       } catch (error) {
    //         console.log(error, "요청실패");
    //     }
    // };

  return (
    <div className='mypage-body2'>
      <div className='emoji-shop'>
          <h3 className='emoji-title1'>이모지 상점</h3>
          <h3 className='emoji-title2'>보유 포인트: <span>123124{}</span><span>C</span></h3>
      </div>
      <div className='emoji-body'>
          <div className='emoji-left'>
              <div className='emoji-video'>영상</div>
              <div className='select-emoji'>
                <div className='emoji-img' >{selectedEmoji ? <img className='selected-emoji' src={selectedEmoji} alt='' /> : '선택된 이모지 없음'}</div>
                <div>
                  <div className='emoji-id'>이모지id: {}</div>
                  <div className='emoji-price'>price: {}c</div>
                </div>
              </div>
          </div>
          <div className='emoji-right'>
            <div className='emojicomp'>
              <img className='emoji-size' src={emoji1} onClick={() => handleEmojiClick(emoji1)} alt=""/>
              <img className='emoji-size' src={emoji2} onClick={() => handleEmojiClick(emoji2)} alt=""/>
              <img className='emoji-size' src={emoji3} onClick={() => handleEmojiClick(emoji3)} alt=""/>
            </div>
          </div>
      </div>
      <div className='select-button'>
          <div className='sellect-btn btnpos'>취소</div>
          <div className='sellect-btn'>구입</div>
      </div>
    </div>
  )
}

export default Myemojipage