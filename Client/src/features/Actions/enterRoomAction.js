import axios from "axios";
import { roomActions } from "../../redux/reducer/roomInfoReducer";

const roomApi = axios.create({
  baseURL: process.env.REACT_APP_SPRING_URI,
  headers: { "cotent-type": "application/json" },
  timeout: 3000,
});

function getRoomInfo(requestData) {
  return async (dispatch, getState) => {
    await roomApi
      .get("/api/room/find", {
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

export const enterRoomAction = { getRoomInfo };
