import "./goLobby.css"
import {useNavigate} from "react-router-dom"
import axios from "axios";

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
    //방입장
    const findRoom = async () => {
        try {
            const requestData = {
                gameType: 1,
            };
            const response = await axios.get(
                "http://localhost:5000/api/room/find", 
                { 
                    params: requestData,
                }
            );
            console.log(response)
            goTogame()
        } catch (error) {
            console.error("생성 실패",error)
        }

    }
    // 방생성
    // 초대용방 확인 isPublicRoom = T (공용방), F (비공개방)

    const createRoom = async () => {
        try {
            const requestData = {
                isPublicRoom: "T",
                userId: 1,
                gameType: 1,
            };
            const response = await axios.post(
                "http://localhost:5000/api/room/make", 
                requestData,
            );
            console.log(response)
            goTogame()
        } catch (error) {
            console.error("생성 실패", error);
        }
    };


    return (
        <div>
            <div className="golobby">
                <h3>{gamename()}</h3>
                <button id='chatoutbutton' onClick={closeModal}>취소</button>
                <div className="selectlobby">
                    <div className="Loobycreate" onClick={()=>createRoom()}> 방 생성</div>
                    <div className="Loobyselect" onClick={()=>findRoom()}> 방 입장</div>
                </div>

            </div>
        </div>
    );
}

export default GoLobbyModal;