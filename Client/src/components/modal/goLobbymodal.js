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
      return "모기를 잡아라!";
    } else if (value === 2) {
      return "도전! 픽토그램";
    } else if (value === 3) {
      return "공피하기";
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
      gameType: value,
    };
    await dispatch(enterRoomAction.makeRoomInfo(requestData));
    setShouldNavigate(true); // 방 생성 클릭 후 shouldNavigate를 true로 설정
  };
  useEffect(() => {
    if (sessionId) {
      goToLobby();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldNavigate]);

  return (
    <div className="modal-container">
      <div className="golobby">
        <div className="cancelbtn canceltext" onClick={closeModal}>
          X
        </div>
        {/* <h1 className="gametitle">{gamename()}</h1> */}
        <h2>{gamename()}</h2>
        <div className="tutorial">
          <img src="images/img/cap.png" alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
        <br/>
        <p> 화면에 나타나는 모기를 그림과 같은 동작을 통해 더 많이, 더빠르게 잡자 !<br/>
          정확한 동작으로 잡아야 운동효과 UP !
          </p>

        <div className="selectlobby">
          <button className="modalButton-left"onClick={() => createRoom()}>
            방 생성          
          </button>

          {/* <button className="modalButton-left" onClick={() => createRoom()}>
            방 생성
            {/* <img src="images/img/enter_room.png" alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} /> 
          </button> */}

          <button  className="modalButton-right" onClick={() => findRoom()}>
            방 입장
            {/* <img src="images/img/make_room.png" alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} /> */}
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default GoLobbyModal;