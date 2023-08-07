// 로그인 페이지에서 토큰, 유저정보 받기

import axios from "axios";
import { authActions } from "../../redux/reducer/authenticateReducer";
// import { useNavigate } from "react-router-dom";

// axios create로 axios를 커스터 마이징한 인스턴스 생성
const loginApi = axios.create({
  baseURL: process.env.REACT_APP_SPRING_URI,
  headers: { "cotent-type": "application/json" },
  timeout: 3000,
});

const logoutApi = axios.create({
  baseURL: process.env.REACT_APP_SPRING_URI,
  headers: { "cotent-type": "application/json" },
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
  console.log("로그인id :"+ userId);

  return async (dispatch, getState) => {
    await loginApi
      .get("/api/user/userinfo/" + userId )
      .then((res) => {
        console.log("유저정보 받아옴 :", res.data.data);
        dispatch(authActions.getUserInfo( res.data.data ));
      })
      .catch((err) => {
        console.log(userId);
        console.log(err);
      });
  };
}

function userLogout(userId){
  return async () =>{
    await logoutApi
    .delete("/api/oauth/logout/" + userId)
    .then(
          console.log("로그아웃 완료!!")
      )
      .catch((err)=>{
        console.log("err메세지:"+err);
      });
  };
}

export const authenticateAction = { getTokensUserId, getUserInfo, userLogout };
