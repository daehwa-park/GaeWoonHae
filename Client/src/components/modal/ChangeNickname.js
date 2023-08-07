import "./ChangeNickname.css"
import { useDispatch } from "react-redux";
import { emojiShopAction } from '../../features/Actions/emojiprocessing'


function RecommendModal({ setModalOpen, userPoint,userId,selectEmojiId }) {
    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };

    const dispatch = useDispatch();
    const emojiBuy = async() => {
        console.log('확인')
        dispatch(emojiShopAction.emojiBuy(userPoint, userId, selectEmojiId));
    }
  


    return (
        <div id='Buymodals'>
            <h3 id='codetxt2'>닉네임 변경하기</h3>
            <div id='Buymodal'>
                <p id='buybutton' onClick={emojiBuy} >확인</p>
                <p id='buybutton' onClick={closeModal}>취소</p>
            </div>
        </div>
    );
}
export default RecommendModal;