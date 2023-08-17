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


loginApi.interceptors.request.use(
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

loginApi.interceptors.response.use(
  (response) => {
    if (response.status === 404) {
      console.log('404 페이지로 넘어가야 함!');
    }

    return response;
  },
  async (error) => {

    if (error.response.status === 401) {

      console.log("코드 스테이터스 401");

      if (error.response.data.code === "E004") {
        console.log("리프레쉬 토큰이 올바르지 않음, 재 로그인 요망");
        alert("로그인 페이지로 돌아갑니다.");
        window.location.href = `${process.env.REACT_APP_CLIENT_URI}`;
        return;
      }

      if (error.response.data.code === "E003") {
        console.log("엑세스 토큰이 올바르지 않음, 토큰 재발급을 실행함")

        await refreshToken();

        const accessToken = window.localStorage.getItem("accessToken");

        error.config.headers = {
          'Content-Type': 'application/json',
          'token': accessToken,
        };
        
        // 중단된 요청을(에러난 요청)을 토큰 갱신 후 재요청
        const response = await axios.request(error.config);
        return response;
      }
    }
    else {
      return Promise.reject(error);
    }
  }
);

async function refreshToken() {
    console.log("토큰 재발급 요청")
    const refreshToken = window.localStorage.getItem("refreshToken");
    const userId = window.localStorage.getItem("userId");

    await loginApi
      .post("/api/oauth/regen",{
        userId,
        refreshToken,
      })
      .then((res) => {
        console.log("토큰 재발급됨!!")
        const tokens = res.data.data.tokens;
        window.localStorage.setItem("accessToken", tokens.accessToken);
        window.localStorage.setItem("refreshToken", tokens.refreshToken);
        const userId = res.data.data.userId;
        window.localStorage.setItem("userId", userId);
      })
      .catch((err) => {
        console.log("재발급 실패!!!")
        console.log(err);
      });
}


// 토큰 발급
function getTokensUserId(authorizationCode) {
  return async (dispatch, getState) => {
    await loginApi
      .post("/api/oauth/login/kakao", {
        authorizationCode,
      })
      .then((res) => {
        const tokens = res.data.data.tokens;
        window.localStorage.setItem("accessToken", tokens.accessToken);
        window.localStorage.setItem("refreshToken", tokens.refreshToken);
        const userId = res.data.data.userId;
        window.localStorage.setItem("userId", userId);
        dispatch(authActions.getTokensUserId({ tokens, userId }));
      })

      .catch((err) => {
        console.log(err);
      });
  };
}

// 유저 정보 받기
function getUserInfo(userId) {

  return async (dispatch, getState) => {
    await loginApi
      .get("/api/user/userinfo/" + userId )
      .then((res) => {
        console.log(res.data.data);
        dispatch(authActions.getUserInfo( res.data.data ));
      })
      .catch((err) => {
        console.log("유저 정보 요청 거절됨", err);
      });
  };
}

// 유저 로그아웃 요청
function userLogout(userId){
  return async (dispatch, state) =>{
    await loginApi
    .delete("/api/oauth/logout/" + userId)
    .then(() => {
      window.localStorage.clear();
      console.log("로그아웃 성공");
    })
      .catch((err)=>{
          console.log("err메세지:"+err);
      });
  };
}

async function userResign() {
  let alert = "회원을 탈퇴하면 데이터를 복구하실 수 없습니다.\n정말로 회원을 탈퇴하시겠습니까?";  
  let lastAlert = "회원을 탈퇴하시려면 현재 사용중인 닉네임을 입력해 주세요";
  let nickname;
  let msg = false;

  const userId = localStorage.getItem("userId");
  const refreshToken = localStorage.getItem("refreshToken");

  if (window.confirm(alert)) {
    nickname = prompt(lastAlert);

    console.log(userId, nickname, refreshToken);
    
    await loginApi
    .post("/api/user/resign", {
      userId,
      nickname,
      refreshToken
    })
    .then((resp) => {
      msg = resp.data.data;
    })
    .catch((error) => {
      console.log(error);
    })
  }

  if (msg === "success") {
    window.alert("회원 탈퇴가 완료되었습니다.\n다시 방문하시길 기다리겠습니다.");
    return true;
  } else {
    window.alert("회원 탈퇴를 할 수 없습니다.");
    return false;
  }
}

export const authenticateAction = { getTokensUserId, getUserInfo, userLogout, refreshToken, userResign };
