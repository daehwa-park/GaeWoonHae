// 대기방 정보

// Api요청 =>  방정보 받기,     
//            (getRoomInfo)            


import axios from "axios";
import { roomActions } from "../../redux/reducer/roomInfoReducer";

const roomApi = axios.create({
  baseURL: process.env.REACT_APP_SPRING_URI,
  headers: { "cotent-type": "application/json" },
  timeout: 5000,
});

function getRoomInfo(requestData) {
  return async (dispatch, getState) => {
    await roomApi
      .get(`/api/room/find`, {
        params: requestData,
      })
      .then((res) => {
        console.log("세션정보", res);

        const { sessionId, hostName, gameType } = res.data.data;
        console.log("세션아이디", sessionId);
        console.log("호스트", hostName);
        console.log("게임타입", gameType);

        dispatch(roomActions.getRoomInfo({ sessionId, hostName, gameType }));
      })
      .catch((err) => {
        console.log("세션정보에러떴음", err);
      });
  };
}

// // 방생성 로직
function makeRoomInfo(requestData) {
  return async (dispatch, getState) => {
    console.log("방생성 데이터", requestData);
    await roomApi
      .post("/api/room/make", requestData)
      .then((res) => {
        const { sessionId, hostName, gameType } = res.data.data;
        dispatch(roomActions.getRoomInfo({ sessionId, hostName, gameType }));
        console.log("방생성정보", res);
      })
      .catch((err) => {
        console.log("방생성 에러", err);
      });
  };
}

export const enterRoomAction = { getRoomInfo, makeRoomInfo };
