// 닉네임 변경 모달
// 사용처 : 마이페이지

import "./ChangeNickname.css"
import { useDispatch } from "react-redux";
import { useState } from "react";
import {edituserinfo} from "../../features/Actions/edituserinfo"

function ChangeNickModal({ setModalOpen, userId }) {

    const [nickname, setName] = useState("");
    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };

    const dispatch = useDispatch();
    const changename = async() => {
        console.log('닉네임 변경 시도')
        dispatch(edituserinfo.changeUserNick(nickname,userId));
        closeModal();
    }
  
    return (
    <div className="nickmodal-container">

        <div id='nickmodals'>
            <h3 id='nickcodetxt'>닉네임 변경하기</h3>
            <input id='nickcodeinput' type="text"  value={nickname} onChange={(e) => setName(e.target.value)} ></input>
            <div id='nickmodal'>
                <p className="nick-next" id='nickbutton' onClick={changename} >확인</p>
                <p id='nickbutton' onClick={closeModal}>취소</p>
            </div>
        </div>
        </div>
    );
}

export default ChangeNickModal;