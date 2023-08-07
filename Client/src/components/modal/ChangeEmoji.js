import "./ChangeEmoji.css"
import { useDispatch } from "react-redux";
import { emojiShopAction } from '../../features/Actions/emojiprocessing'
import { useSelector } from "react-redux/es/hooks/useSelector";
import emoji1 from '../../assets/emoji/emoji_1.png'
import emoji2 from '../../assets/emoji/emoji_2.png'
import emoji3 from '../../assets/emoji/emoji_3.png'
import { useEffect, useState } from "react";
import {edituserinfo} from '../../features/Actions/edituserinfo'

function ChangeEmojiModal({ setModalOpen }) {
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
            case 1:
              return emoji1;
            case 2:
              return emoji2;
            case 3:
              return emoji3;
            default:
              return ""; 
          }
        };
    return (
        <div id='Buymodals'>
            <h3 id='codetxt2'>이모지 변경하기 {saveEmoji}</h3>
            <div className='emoji-img' >{selectedEmoji ? <img className='selected-emoji' src={selectedEmoji} alt='' /> : '선택된 이모지 없음'}</div>
            <div className='emojicomp'>
                {saveEmoji.map((emojiId)=>(
                    <img className='emoji-size' src={getEmoji(emojiId)} onClick={() => handleEmojiClick(getEmoji(emojiId),emojiId)} alt=""/>
                ))}
              {/* <img className='emoji-size' src={emoji2} onClick={() => handleEmojiClick(emoji2,2)} alt=""/>
              <img className='emoji-size' src={emoji3} onClick={() => handleEmojiClick(emoji3,3)} alt=""/> */}
            </div>
            <div id='Buymodal'>
                <p id='buybutton' onClick={emojiSellect} >적용하기</p>
                <p id='buybutton' onClick={closeModal}>취소</p>
            </div>
        </div>
    );
}
export default ChangeEmojiModal;