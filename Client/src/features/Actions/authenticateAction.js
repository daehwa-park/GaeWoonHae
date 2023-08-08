// 로그인,유저정보 관리

// Api요청 => 카카오토큰발급,      유저정보 받기,         로그아웃
//           (getTokensUserId)   (getUserInfo)       (userLogout)

import axios from "axios";
import { authActions } from "../../redux/reducer/authenticateReducer";


// 로그인요청 주소
const loginApi = axios.create({
  baseURL: process.env.REACT_APP_SPRING_URI,
  headers: { "cotent-type": "application/json" },
  timeout: 3000,
});

// 로아웃요청 주소
const logoutApi = axios.create({
  baseURL: process.env.REACT_APP_SPRING_URI,
  headers: { "cotent-type": "application/json" },
});


// 토큰 발급
function getTokensUserId(authorizationCode) {
  return async (dispatch, getState) => {
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
      });
  };
}

// 유저 정보 받기
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

// 유저 로그아웃 요청
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
