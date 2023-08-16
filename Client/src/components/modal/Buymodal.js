// 이모지 구입 확인 모달
// 사용처 : 이모지 상점

import "./Buymodal.css"
import { useDispatch } from "react-redux";
import { emojiShopAction } from '../../features/Actions/emojiprocessing'
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect, useState } from "react";
import {edituserinfo} from '../../features/Actions/edituserinfo'


function BuyModal({ setModalOpen, userPoint,userId,selectEmojiId, selectPrice, EmojiList }) {
    // 유저 포인트
    // 구입한 이모지 리스트
    const saveEmoji = useSelector((state) => state.auth.user.saveEmoji);
    const [changeBuyMD,newChangeBuyMD] = useState(0)
    
    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };

    const dispatch = useDispatch();
    const emojiBuy = async() => {
        if (saveEmoji.includes(selectEmojiId)) { // 이미 이모지를 구입한 경우
            newChangeBuyMD(1)
        } else if (userPoint<selectPrice) { // 포인트가 부족한 경우
            console.log(saveEmoji,selectEmojiId,'확인@@')
            newChangeBuyMD(2)
        } else if (!saveEmoji.includes(selectEmojiId) ) { // 구입할수있는경우
            dispatch(emojiShopAction.emojiBuy(userPoint, userId, selectEmojiId));
            console.log(saveEmoji,selectEmojiId,'확인@@')
            
            newChangeBuyMD(3)
        } 
    }
    //이모지 리스트 갱신,가져오기
    const emojiList = async(userId) => {
        console.log('리스트 가져오기')
        dispatch(edituserinfo.getEmojiList(userId));
    }

    useEffect(()=> {
        const fetchData = async () => {
            await emojiList(userId)
        }
        fetchData();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
    <div className="modal-container">

        <div id='Buymodals'>
            {changeBuyMD === 0 && (
                <div>
                    <h3 id='codetxt3'>구매하시겠습니까?</h3>
                    <div id='Buymodal'>
                        <p className="btn-enter" id='buybutton'  onClick={emojiBuy} >확인</p>
                        <p id='buybutton' onClick={closeModal}>취소</p>
                    </div>
                </div>
            )}

            {changeBuyMD === 1 && (
                <div>
                    <h3 id='codetxt4'>이미 구매한 이모지 입니다</h3>
                    <div id='Buymodal'>
                        <p id='buybutton' onClick={closeModal} >확인</p>
                    </div>
                </div>
            )}

            {changeBuyMD === 2 && (
                <div>
                    <h3 id='codetxt5'>포인트가 부족합니다.</h3>
                    <div id='Buymodal'>
                        <p id='buybutton' onClick={closeModal} >확인</p>
                    </div>
                </div>
            )}

            {changeBuyMD === 3 && (
                <div>
                    <h3 id='codetxt2'>이모지 구매가 <br/> 완료되었습니다.</h3>
                    <div id='savepoint'>남은 포인트 : {userPoint}</div>
                    <div id='Buymodal'>
                        <p id='buybutton' onClick={closeModal} >확인</p>

                    </div>
                </div>
            )}

        </div></div>
    );
}
export default BuyModal;