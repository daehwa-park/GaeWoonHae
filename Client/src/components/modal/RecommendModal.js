// 초대코드 입장 모달
// 사용처: 메인페이지, 마이페이지
import { useRef } from "react";
import "./RecommendModal.css";
import { useDispatch, useSelector } from "react-redux";
import { enterRoomAction } from "../../features/Actions/enterRoomAction";
import { useNavigate } from "react-router-dom";

function RecommendModal({ setModalOpen }) {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inviteCodeRef = useRef(null); // 초대코드 input을 참조할 ref 생성

  // Redux store에서 필요한 데이터를 가져옵니다.
  //   const { sessionId, gameType } = useSelector((state) => state.roomInfo);
  const roomInfo = useSelector((state) => state.roomInfo);
  //오류방지
  console.log(roomInfo)
  const enterRoom = () => {
    const inputValue = inviteCodeRef.current.value;
    const requestData = {
      sessionId: inputValue,
    };
    if (inputValue) {
      console.log("입장하려는 초대코드:", inputValue);

      dispatch(enterRoomAction.codeEnterRoom(requestData))
        .then((response) => {
          if (response) {
            console.log("응답하라", response);
            // 방 정보가 Redux store에 저장된 후에 페이지 이동을 합니다.
            // const { sessionId, gameType } = roomInfo;

            navigate(`/lobby/${response.gameType}/${response.sessionId}`);
          } else {
            // 이 부분에서 에러 메시지를 사용자에게 표시하는 모달을 트리거할 수 있습니다.
            alert(response.message || "방에 입장할 수 없습니다.");
          }
        })
        .catch((error) => {
          console.error("Error while entering room:", error);
          alert("방에 입장하는 도중 문제가 발생했습니다.");
        });
    } else {
      alert("초대코드를 입력하세요.");
    }
  };

  return (
    <div className="Recmodal-container">

    <div id="nickmodals">
      <h3 id="nickcodetxt">초대코드 입력</h3>
      <input id="nickcodeinput" type="text" ref={inviteCodeRef}></input>
      
      <div id="Recmodalcom">
        <p className="rec-next" id="recombutton" onClick={enterRoom}>입장</p>
        <p id="recombutton" onClick={closeModal}>취소</p>
      </div>
    </div>
    </div>
  );
}

export default RecommendModal;
