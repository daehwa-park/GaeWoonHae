import "./goLobbymodal.css";
import { useNavigate } from "react-router-dom";

import { enterRoomAction } from "../../features/Actions/enterRoomAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function GoLobbyModal({ setModalOpen, value }) {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.user.userId);
  const sessionId = useSelector((state) => state.roomInfo.sessionId);
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };
  const [shouldNavigate, setShouldNavigate] = useState(false); // shouldNavigate 상태 추가

  const goToLobby = () => {
    if (shouldNavigate) {
      // shouldNavigate가 true일 때만 navigate 실행
      navigate(`/lobby/${value}/${sessionId}`);
      setShouldNavigate(false); // navigate 후 shouldNavigate를 다시 false로 설정
    }
  };
  // 1. navigate 선언
  const navigate = useNavigate();
  // 2. 함수로직 작성

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
  const findRoom = async () => {
    const requestData = {
      gameType: value,
    };
    await dispatch(enterRoomAction.getRoomInfo(requestData));
    setShouldNavigate(true); // 방 입장 클릭 후 shouldNavigate를 true로 설정
  };

  // 방생성a
  // 초대용방 확인 isPublicRoom = T (공용방), F (비공개방)

  const createRoom = async () => {
    const requestData = {
      isPublicRoom: "Y",
      userId,
      gameType: 1,
    };
    await dispatch(enterRoomAction.makeRoomInfo(requestData));
    setShouldNavigate(true); // 방 생성 클릭 후 shouldNavigate를 true로 설정
  };
  useEffect(() => {
    if (sessionId) {
      goToLobby();
    }
  }, [shouldNavigate]);

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