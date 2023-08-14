// 이모지 구입 확인 모달
// 사용처 : 이모지 상점

import "./lobbyClose.css"
import { useNavigate } from "react-router-dom";


function LobbyClose({ setModalOpen }) {
    const navigate = useNavigate();
    // 모달 끄기 
    const closeModal = () => {
        navigate(`/main`);
        setModalOpen(false);
    };

    return (
        <div id='lobbymodals'>
            <div className="header">방장이 나가서 방이 사라졌습니다.</div>
                <div className="buttons">
                    <button  className="Button" onClick={closeModal} >🔙 나가기</button>
                </div>
        </div>
    );
}
export default LobbyClose;