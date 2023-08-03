import axios from "axios";
import { authActions } from "../../redux/reducer/authenticateReducer";

const loginApi = axios.create({
  baseURL: process.env.REACT_APP_SPRING_URI,
  headers: { "cotent-type": "application/json" },
  timeout: 5000,
});

function getSessionId(requestData) {
  return async (dispatch, getState) => {
    await loginApi
      .get("/api/room/find", {
        params: requestData,
      })
      .then((res) => {
        console.log("세션정보", res);
        const sessionId = res.data.data;
        dispatch(authActions.getSessionId({ sessionId }));
      })
      .catch((err) => {
        console.log("세션정보에러떴음", err);
      });
  };
}

export const enterRoomAction = { getSessionId };
