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
