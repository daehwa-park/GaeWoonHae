// 마이 페이지에서 이모지 정보를 수정, 관리

import axios from "axios";
import { authActions } from "../../redux/reducer/authenticateReducer";

const emojiapi = axios.create({
  baseURL: process.env.REACT_APP_SPRING_URI,
  headers: { "cotent-type": "application/json" },
})



function buyEmoji(requestdata) {
  return async (dispatch, getState) => {

    await emojiapi
      .post("/api/", {
        requestdata,
      })
      .then((res) => {
        // 받아온 정보 => 리덕스에 저장
        const tokens = res.data.data.tokens;
        const userId = res.data.data.userId;
        dispatch(authActions.getTokensUserId({ tokens, userId })); // 리덕스파일에 함수,변수 생성해 저장
        console.log(res);
      })

      .catch((err) => {
        console.log(err);
      });
  };
}


export const authenticateAction = { buyEmoji };
