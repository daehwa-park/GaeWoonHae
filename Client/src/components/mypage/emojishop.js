import './emojishop.css'
import emoji1 from '../../assets/emoji/emoji_1.png'
import emoji2 from '../../assets/emoji/emoji_2.png'
import emoji3 from '../../assets/emoji/emoji_3.png'
import { useEffect, useState } from 'react'
import { emojiShopAction } from '../../features/Actions/emojiprocessing'
import { useDispatch,useSelector } from "react-redux";
import BuyBtn from '../modal/Buymodal'


const Myemojipage = () => {
  
  // 유저 Id
  const userId = useSelector((state) => state.auth.user.userId);
  // 유저 포인트
  const userPoint = useSelector((state) => state.auth.user.point);
  // 유저 이모지 id
  const userEmojiId = useSelector((state) => state.auth.user.emojiId);
  // 이모지 가격 리스트
  const emojiPriceList = useSelector((state) => state.emoji.emoji.emojiPrice);
  const nickname = useSelector((state) => state.auth.user.nickname);
  // 구입한 이모지 리스트
  const saveEmoji = useSelector((state) => state.auth.user.saveEmoji) ?? [1];
    
  //선택된 이모지 이미지정보
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  //선택된 이모지 id값 - 실행시 유저의 이모지 id값을 가져온다.
  const [selectEmojiId, setSelectEmojiId] = useState(userEmojiId);
  // 선택된 이모지 가격정보
  const [selectPrice, setSelectPrice] = useState(0)

  // 이모지 선택시 정보 변경
  const handleEmojiClick = (emoji,num) => {
    setSelectedEmoji(emoji);
    setSelectEmojiId(num);
    setSelectPrice(emojiPriceList[num-1])
  };     
  
  // 이모지 선택 취소
  const emojiCancel = () => {
    setSelectedEmoji(null);
    setSelectEmojiId(userEmojiId);
    setSelectPrice(0)
  };

  // 이모지 리스트 서버에 요청
  // const emojiIdList = useSelector((state) => state.emoji.emoji.emojiId);
  useEffect(()=>{ 
    emojiShopdata();
    console.log('유저정보:',userId,userPoint,userEmojiId,nickname )
    // console.log('구입한 이모지:',name )
  },[]);
  
  const dispatch = useDispatch();
  const emojiShopdata = async() => {
    dispatch(emojiShopAction.emojiShopdata());
  }


  //구입 모달
  const [LobbymodalOpen, setLobbyModalOpen] = useState(false);

  // 모달 입장
  const showLobbyModal = () => {
        setLobbyModalOpen(true);
      }
  
  

  return (
    <div className='mypage-body2'>
      <div className='emoji-shop'>
          <h3 className='emoji-title1'>이모지 상점 {saveEmoji}</h3>
          <h3 className='emoji-title2'>보유 포인트: <span>{userPoint}</span><span>C</span></h3>
      </div>
      <div className='emoji-body'>
          <div className='emoji-left'>
              <div className='emoji-video'>영상</div>
              <div className='select-emoji'>
                <div className='emoji-img' >{selectedEmoji ? <img className='selected-emoji' src={selectedEmoji} alt='' /> : '선택된 이모지 없음'}</div>
                <div>
                  <div className='emoji-id' >이모지id: {selectEmojiId}</div>
                  <div className='emoji-price'>price: {selectPrice}c</div>
                </div>
              </div>
          </div>
          <div className='emoji-right'>
            <div className='emojicomp'>
              <img className='emoji-size' src={emoji1} onClick={() => handleEmojiClick(emoji1,1)} alt=""/>
              <img className='emoji-size' src={emoji2} onClick={() => handleEmojiClick(emoji2,2)} alt=""/>
              <img className='emoji-size' src={emoji3} onClick={() => handleEmojiClick(emoji3,3)} alt=""/>
            </div>
          </div>
      </div>
      <div className='select-button'>
          <div className='sellect-btn btnpos' onClick={emojiCancel}>취소</div>
          <div className='sellect-btn' onClick={()=>showLobbyModal()}>구입</div>
      </div>    
      {LobbymodalOpen && <BuyBtn userPoint={userPoint} userId={userId} selectEmojiId={selectEmojiId}  setModalOpen={setLobbyModalOpen} selectPrice={selectPrice} EmojiList={saveEmoji} />}    
    </div>
  )
}

export default Myemojipage