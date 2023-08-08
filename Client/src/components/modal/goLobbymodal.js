import "./goLobbymodal.css";
import { useNavigate } from "react-router-dom";

import { enterRoomAction } from "../../features/Actions/enterRoomAction";
import { useDispatch, useSelector } from "react-redux";

function GoLobbyModal({ setModalOpen, id, title, content, writer, value }) {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.user.userId);
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  // 1. navigate 선언
  const navigate = useNavigate();
  // 2. 함수로직 작성
  const goTogame = () => {
    navigate(`/lobby/${value}`);
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
  const findRoom = () => {
    const requestData = {
      gameType: value,
    };
    dispatch(enterRoomAction.getRoomInfo(requestData));
    goTogame();
  };
  // 방생성a
  // 초대용방 확인 isPublicRoom = T (공용방), F (비공개방)

  const createRoom = async () => {
    const requestData = {
      isPublicRoom: "T",
      userId,
      gameType: 1,
    };

await dispatch(enterRoomAction.makeRoomInfo(requestData));

await goTogame();
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
            <br />
            <div>
              <input type="radio"></input>
            </div>
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