import "./goLobby.css"
import {useNavigate} from "react-router-dom"

function GoLobbyModal({ setModalOpen, id, title, content, writer, value }) {
    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };

    // 1. navigate 선언
    const navigate = useNavigate();
    // 2. 함수로직 작성
    const goTogame=() => {
        navigate(`/lobby/${value}`)
    };

    const gamename =() => {
        if (value ===1) {
            return "박터트리기 방생성";
        } else if (value ===2) {
            return "픽토그램 방생성"
        } else if (value ===3) {
            return "공피하기 방생성"
        }
    }

    return (
        <div>
            <div className="golobby">
                <h3>{gamename()}</h3>
                <button id='chatoutbutton' onClick={closeModal}>취소</button>
                <div className="selectlobby">
                    <div className="Loobycreate" onClick={()=>goTogame()}> 방 생성</div>
                    <div className="Loobyselect" onClick={()=>goTogame()}> 방 입장</div>
                </div>

            </div>
        </div>
    );
}

export default GoLobbyModal;