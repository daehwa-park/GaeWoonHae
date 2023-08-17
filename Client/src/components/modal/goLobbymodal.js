import "./goLobbymodal.css";

import { useNavigate } from "react-router-dom";

import { enterRoomAction } from "../../features/Actions/enterRoomAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import mostuto1 from "../../assets/game/jumpingjack/mos_tuto1.png"
import mostuto2 from "../../assets/game/jumpingjack/mos_tuto2.png"
import mostuto3 from "../../assets/game/jumpingjack/mos_tuto3.png"
import mostuto4 from "../../assets/game/jumpingjack/mos_tuto4.png"
import mostuto from "../../assets/game/jumpingjack/mosquito2.png"
import mostutodie from "../../assets/game/jumpingjack/mosquito3.png"
import picto_tuto1 from "../../assets/game/picto/picto_tuto1.png"
import picto_tuto2 from "../../assets/game/picto/picto_tuto2.png"
import picto_tuto3 from "../../assets/game/picto/picto_tuto3.png"
import picto_tuto4 from "../../assets/game/picto/picto_tuto4.png"

function GoLobbyModal({ setModalOpen, value }) {

  
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.user.userId);
  const sessionId = useSelector((state) => state.roomInfo.sessionId);
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };
  const [shouldNavigate, setShouldNavigate] = useState(false); // shouldNavigate 상태 추가


  const [showMessage1, setShowMessage1] = useState(false);
  const [showMessage2, setShowMessage2] = useState(false);
  const [showMessage3, setShowMessage3] = useState(false);
  const [showMessage4, setShowMessage4] = useState(false);
  const [showMessage5, setShowMessage5] = useState(false);
  const [showMessage6, setShowMessage6] = useState(false);
  const [showMessage7, setShowMessage7] = useState(false);
  const [showMessage8, setShowMessage8] = useState(false);
  const [showMessage9, setShowMessage9] = useState(false);
  const [showMessage10, setShowMessage10] = useState(false);

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

  useEffect(()=>{
    const timer1 = setTimeout(() => {
      setShowMessage1(true);
    }, 200);
    const timer2 = setTimeout(() => {
      setShowMessage2(true);
    }, 1100);
    const timer3 = setTimeout(() => {
      setShowMessage3(true);
    }, 2000);
    const timer4 = setTimeout(() => {
      setShowMessage4(true);
    }, 2900);
    const timer5 = setTimeout(() => {
      setShowMessage5(true);
    }, 3300);
    const timer6 = setTimeout(() => {
      setShowMessage6(true);
    }, 4200);
    const timer7 = setTimeout(() => {
      setShowMessage7(true);
    }, 400);
    const timer8 = setTimeout(() => {
      setShowMessage8(true);
    }, 1400);
    const timer9 = setTimeout(() => {
      setShowMessage9(true);
    }, 2200);
    const timer10 = setTimeout(() => {
      setShowMessage10(true);
    }, 3200);
  },[]);


  return (
    <div className="modal-container">
      <div className="golobby">
        <div className="cancelbtn canceltext" onClick={closeModal}>
          X
        </div>
        {/* <h1 className="gametitle">{gamename()}</h1> */}
        <h2 className="tutorial-name">{gamename()}</h2>

        {value===1 && (
          <div>   
            <div className="tutorial">
              {/* <img src="images/img/cap.png" alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} /> */}
              <img className={`mostuto mst1 ${showMessage1 ? 'show' : ''}`} src={mostuto1} alt=""/>
              <img className={`mostuto mst2 ${showMessage2 ? 'show' : ''}`} src={mostuto2} alt=""/>
              <img className={`mostuto mst3 ${showMessage3 ? 'show' : ''}`} src={mostuto3} alt=""/>
              <img className={`mostuto mst5 ${showMessage5 ? 'show' : ''}`} src={mostuto4} alt=""/>
              <img className={`mos-img-modal mst4 ${showMessage4 ? 'show' : ''}`} src={mostuto} alt=""/>
              <img className={`mosdie-img-modal mst6 ${showMessage6 ? 'show' : ''}`} src={mostutodie} alt=""/>
            </div>
            <br/>
            <p className="tutorial-content"> 화면에 나타나는 모기를 그림과 같은 동작을 통해 더 많이, 더빠르게 잡자 !<br/>
              정확한 동작으로 잡아야 운동효과 UP !
            </p>
          </div>
        )}
        {value===2 && (
          <div>   
            <div className="tutorial2">
              <img className={`pictos pic1 ${showMessage7 ? 'show' : ''}`} src={picto_tuto1} alt=""/>
              <img className={`pictos2 pic2 ${showMessage8 ? 'show' : ''}`} src={picto_tuto2} alt=""/>
              <img className={`pictos3 pic3 ${showMessage9 ? 'show' : ''}`} src={picto_tuto3} alt=""/>
              <img className={`success-imgs pic4 ${showMessage10 ? 'show' : ''}`} src={picto_tuto4} alt=""/>
            </div>
            <br/>
            <p className="tutorial-content"> 화면에 나타나는 동작을 더빠르게 !<br/>
              정확한 동작을 취해야 운동효과 UP !
            </p>
          </div>
        )}



        <div className="selectlobby">
          <button className="modalButton-left go-lobby"onClick={() => createRoom()}>
            방 생성          
          </button>

          {/* <button className="modalButton-left" onClick={() => createRoom()}>
            방 생성
            {/* <img src="images/img/enter_room.png" alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} /> 
          </button> */}

          <button  className="modalButton-right go-lobby" onClick={() => findRoom()}>
            방 입장
            {/* <img src="images/img/make_room.png" alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} /> */}
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default GoLobbyModal;