
// 사용할 이모지 변경 모달 
// 사용처 : 마이페이지

import "./ChangeEmoji.css"
import { useDispatch } from "react-redux";
import { emojiShopAction } from '../../features/Actions/emojiprocessing'
import { useSelector } from "react-redux/es/hooks/useSelector";
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
import { useEffect, useState } from "react";
import {edituserinfo} from '../../features/Actions/edituserinfo'


function ChangeEmojiModal({ setModalOpen }) {

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
    };

    const dispatch = useDispatch();
    const emojiSellect = async() => {
        console.log('확인')
        dispatch(emojiShopAction.applyEmoji(userId, emojiId));
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
    return (
    <div className="modal-container">

        <div id='changemodals'>
            <h3 id='codetxt7'>이모지 변경하기</h3>
            <div className='changeemoji-text'>내가 보유중인 이모지 :</div>
            <div className='emoji-box2'>
                {/* <div className='emoji-img2' >{selectedEmoji ? <img className='selected-emoji' src={selectedEmoji} alt='' /> : '구입한 이모지가 없습니다.'}</div> */}
                <div className='emojicomp2'>
                    <img className='emoji-size2' src={emojix} onClick={() => handleEmojiClick(emojix,11)} alt=""/>
                    {saveEmoji.map((emojiId)=>(
                        <img key={emojiId} className='emoji-size2' src={getEmoji(emojiId)} onClick={() => handleEmojiClick(getEmoji(emojiId),emojiId)} alt=""/>
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
    );
}
export default ChangeEmojiModal;