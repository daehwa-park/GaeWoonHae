// 대기방 정보

// Api요청 =>  방정보 받기,
//            (getRoomInfo)

import axios from "axios";
import { roomActions } from "../../redux/reducer/roomInfoReducer";
import { authenticateAction } from "./authenticateAction";

const roomApi = axios.create({
  baseURL: process.env.REACT_APP_SPRING_URI,
  headers: { "cotent-type": "application/json" },
  timeout: 5000,
});


roomApi.interceptors.request.use(
  (config) => {
    const accessToken = window.localStorage.getItem('accessToken');

    config.headers['token'] = accessToken;

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
)

roomApi.interceptors.response.use(
  (response) => {
    if (response.status === 404) {
      console.log('404 페이지로 넘어가야 함!');
    }

    return response;
  },
  async (error) => {
    if (error.response.status === 401) {

      if (error.response.data.code === "E004") {
        window.location.href = `${process.env.REACT_APP_CLIENT_URI}`;
        return;
      }

      if (error.response.data.code === "E003") {
        await authenticateAction.refreshToken();

        const accessToken = window.localStorage.getItem("accessToken");

        error.config.headers = {
          'Content-Type': 'application/json',
          'token': accessToken,
        };
        
        // 중단된 요청을(에러난 요청)을 토큰 갱신 후 재요청
        const response = await axios.request(error.config);
        return response;
      }

      if (error.response.data.code === "E003") {
        alert("호스트가 아니라 권한이 없습니다");
        return;
      }

    }
    return Promise.reject(error);
  }
);

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

function leaveRoom(requestData) {
  return async (dispatch, getState) => {
    await roomApi.post("/api/room/leave", requestData)
      .then((res) => {
        console.log("유저 로비방 탈퇴", res);
      })
      .catch((err) => {
        console.log("방 탈퇴 중 오류 발생", err);
      });
  };
}

function arriveRoom(requestData) {
  return async (dispatch, getState) => {
    await roomApi.post("/api/room/arrive", requestData)
      .then((res) => {
        console.log("유저 로비방 입장", res);
      })
      .catch((err) => {
        console.log("유저 로비방 입장 중 오류 발생", err);
      });
  };
}



export const enterRoomAction = {
  getRoomInfo,
  makeRoomInfo,
  recordSave,
  startedRoom,
  finishedRoom,
  codeEnterRoom,
  leaveRoom,
  arriveRoom,
};
