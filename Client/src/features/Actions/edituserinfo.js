// 마이 페이지에서 유저정보를 받아 수정요청

import axios from "axios";
import { authActions } from "../../redux/reducer/authenticateReducer";

const emojiapi = axios.create({
  baseURL: process.env.REACT_APP_SPRING_URI,
  headers: { "cotent-type": "application/json" },
})



function getTokensUserId(authorizationCode) {
  return async (dispatch, getState) => {

    await emojiapi
      .post("/api/", {
        authorizationCode,
      })
      .then((res) => {
        const tokens = res.data.data.tokens;
        console.log(res);
        const userId = res.data.data.userId;
        dispatch(authActions.getTokensUserId({ tokens, userId }));
      })

      .catch((err) => {
        console.log(err);
      });
  };
}


export const authenticateAction = { getTokensUserId };
