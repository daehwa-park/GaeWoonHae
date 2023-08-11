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

function startedRoom(requestData) {
  return async (dispatch, getState) => {
    await roomApi
      .post("/api/room/start", requestData)
      .then((res) => {
        console.log("게임 시작된 방 상태 변경", res);
      })
      .catch((err) => {
        console.log("게임 시작된 방 상태 변경", err);
      });
  };
}

function finishedRoom(requestData) {
  return async (dispatch, getState) => {
    await roomApi
      .post("/api/room/finish", requestData)
      .then((res) => {
        console.log("게임 시작된 방 상태 변경", res);
      })
      .catch((err) => {
        console.log("게임 시작된 방 상태 변경", err);
      });
  };
}

function recordSave(requestData) {
  return async (dispatch, getState) => {
    await roomApi
      .post("/api/record/save", requestData)
      .then((res) => {
        console.log("게임 정보 저장", res);
      })
      .catch((err) => {
        console.log("게임 정보 저장", err);
      });
  };
}
function codeEnterRoom(requestData) {
  return async (dispatch, getState) => {
    try {
      const res = await roomApi.post(`/api/room/find`, requestData);
      console.log("초대 코드 방 저장", res.data.data);
      const { sessionId, hostName, gameType } = res.data.data;
      dispatch(roomActions.getRoomInfo({ sessionId, hostName, gameType }));
      return { success: true, sessionId, gameType };
    } catch (err) {
      // ... 기존의 에러 처리 로직
      if (err.response && err.response.status === 404) {
        alert("존재하지 않는 방입니다.");
      } else {
        console.log("초대 코드 방 찾기 실패", err);
      }
      throw err; // 에러를 다시 throw하여 catch 부분에서 처리할 수 있도록 합니다.
    }
  };
}
// function codeEnterRoom(requestData) {
//   return async (dispatch, getState) => {
//     await roomApi
//       .post(`/api/room/find`, requestData)
//       .then((res) => {
//         console.log("초대 코드 방 저장", res.data.data);
//         const { sessionId, hostName, gameType } = res.data.data;
//         dispatch(roomActions.getRoomInfo({ sessionId, hostName, gameType }));
//         return { success: true };
//       })

//       .catch((err) => {
//         // 서버로부터의 응답 내용에 따라 조건을 변경해야 할 수도 있습니다.
//         // 예를 들면, err.response.data.message === 'Room not found' 와 같은 조건이 될 수 있습니다.
//         if (err.response && err.response.status === 404) {
//           alert("존재하지 않는 방입니다.");
//         } else {
//           console.log("초대 코드 방 찾기 실패", err);
//         }
//       });
//   };
// }

export const enterRoomAction = {
  getRoomInfo,
  makeRoomInfo,
  recordSave,
  startedRoom,
  finishedRoom,
  codeEnterRoom,
};
