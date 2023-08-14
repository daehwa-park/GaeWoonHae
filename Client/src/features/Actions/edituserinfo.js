// 유저정보 수정요청

// Api요청 =>  서버 토큰발급,     구입한 이모지리스트 갱신,     유저 닉네임 변경
//           (getTokensUserId)       (getEmojiList)         (changeUserNick)

import axios from "axios";
import { authActions } from "../../redux/reducer/authenticateReducer";
import { authenticateAction } from "./authenticateAction";

const emojiapi = axios.create({
  baseURL: process.env.REACT_APP_SPRING_URI,
  headers: { "cotent-type": "application/json" },
})

emojiapi.interceptors.request.use(
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

emojiapi.interceptors.response.use(
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
    }
    return Promise.reject(error);
  }
);

// 서버 토큰발급
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

// 구입한 이모지리스트 갱신
function getEmojiList(userId) {
  return async (dispatch, getState) => {

    await emojiapi
      .get("/api/emoji/store/buy/"+userId, {
        userId:userId,
      })
      .then((res) => {
        // const tokens = res.data.data.tokens;
        const emojiList = []
        console.log('리스트 불러오기 성공',res.data.data);
        for (let i=0; i<res.data.data.length ; i++) {
          emojiList.push(res.data.data[i].emojiId)
        }
        console.log(emojiList,"@@@@@@@@@@@")
        // const userId = res.data.data.userId;
        dispatch(authActions.emojiList({ emojiList }));
      })

      .catch((err) => {
        console.log('리스트 불러오지 못함',err);
      });
  };
}

// 유저 닉네임 변경
function changeUserNick(nickname, userId) {
  const data = {
    userId: userId,
    nickname: nickname
  }
  return async (dispatch, getState) => {

    await emojiapi
      .put("/api/user/nickname", 
        data,
      )
      .then((res) => {

        console.log('정상');
        console.log(res);
        const userNick = res.data.data;
        dispatch(authActions.changeNickname(userNick));
      })

      .catch((err) => {
        console.log('오류',nickname,userId);
        console.log(err);
      });
  };
}


export const edituserinfo = { getTokensUserId,changeUserNick,getEmojiList };
