// 로그인 페이지에서 토큰, 유저정보 받기

import axios from "axios";
import { authActions } from "../../redux/reducer/authenticateReducer";
// import { useNavigate } from "react-router-dom";

// axios create로 axios를 커스터 마이징한 인스턴스 생성
const loginApi = axios.create({
  baseURL: process.env.REACT_APP_SPRING_URI,
  headers: { "cotent-type": "application/json" },
  timeout: 5000,
});

function getTokensUserId(authorizationCode) {
  return async (dispatch, getState) => {
    // const navigate = useNavigate();

    await loginApi
      .post("/api/oauth/login/kakao", {
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
        // navigate("/");
      });
  };
}

function getUserInfo(userId) {
  return async (dispatch, getState) => {
    await loginApi
      .get("/api/user/userinfo/" + userId)
      .then((res) => {
        console.log("유저정보", res);
        console.log(userId);
      })
      .catch((err) => {
        console.log(userId);
        console.log(err);
      });
  };
}

export const authenticateAction = { getTokensUserId, getUserInfo };
