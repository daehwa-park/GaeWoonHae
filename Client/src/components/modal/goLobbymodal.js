import "./goLobbymodal.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { enterRoomAction } from "../../features/Actions/enterRoomAction";
import { useDispatch } from "react-redux";

function GoLobbyModal({ setModalOpen, id, title, content, writer, value }) {
  const dispatch = useDispatch();

  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  // 1. navigate 선언
  const navigate = useNavigate();
  // 2. 함수로직 작성
  const goTogame = () => {
    navigate(`/lobby/1`);
  };

  const gamename = () => {
    if (value === 1) {
      return "박터트리기 방생성";
    } else if (value === 2) {
      return "픽토그램 방생성";
    } else if (value === 3) {
      return "공피하기 방생성";
    }
  };


  //방입장
  const lobbyapi = axios.create({
    baseURL: process.env.REACT_APP_SPRING_URI,
    headers: { "cotent-type": "application/json" },

  })

  const findRoom = async () => {
    const requestData = {
      gameType: 1,
    };
    await dispatch(enterRoomAction.getRoomInfo(requestData));
    await goTogame();
  };
  // 방생성a
  // 초대용방 확인 isPublicRoom = T (공용방), F (비공개방)

  const createRoom = async(dispatch) => {
    // dispatch(findRoomRequest());
    try {
        const requestData = {
            isPublicRoom: "T",
            userId: 1,
            gameType: 1,
        };
        
        const res = await lobbyapi.post("/api/room/make", 
            requestData,
        );
        console.log(res);
        goTogame()
      } catch (error) {
        console.log(error, "요청실패");
    }
};


  return (
    <div>
      <div className="golobby">
        <div className="cancelbtn canceltext" onClick={closeModal}>
          취소
        </div>
        <h1 className="gametitle">{gamename()}</h1>
        <div className="selectlobby">
          <div className="Loobycreate roomtext" onClick={() => createRoom()}>
            {" "}
            <p>방 생성</p>
          </div>
          <div className="Loobyselect roomtext" onClick={() => findRoom()}>
            {" "}
            <p>방 입장</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoLobbyModal;
