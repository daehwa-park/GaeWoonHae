// 로그인 토큰과 유저 정보 데이터를 저장하는 리듀서입니다.
import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  accessToken: "",
  refreshToken: "",
  isLoggined: false,
  user: {
    userId: null,
    nickname: "",
    point: 0,
    emojiId: null,
    oauthProvider: "",
    saveEmoji: [1],
  },
};

const authenticateSlice = createSlice({
  name: "auth",
  initialState, 

  reducers: {
    //payload의 토큰들과 유저id를 state에 저장하는 리듀서 함수입니다.
    getTokensUserId(state, action) {
      state.accessToken = action.payload.tokens.accessToken;
      state.refreshToken = action.payload.tokens.refreshToken;
      state.user.userId = action.payload.userId;
    },
    // payload의 엑세스 토큰을 바탕으로 로그인 여부 state를 저장하는 리듀서 함수입니다.
    loginJudgement(state, action) {
      if (action.payload.accessToken) {
        state.isLoggined = true;
      } else {
        state.isLoggined = false;
      }
    },
    // payload의 유저 id를 바탕으로 유저 정보를 저장하는 리듀서 함수입니다.
    getUserInfo(state, action) {
      state.user.nickname = action.payload.nickname;
      state.user.point = action.payload.point;
      state.user.emojiId = action.payload.emojiId;
      state.user.oauthProvider = action.payload.oauthProvider;
    },
    changeNickname(state,action) {
      state.user.nickname = action.payload;
    },

    applyEmoji(state,action) {
      state.user.emojiId = action.payload.emojiId;
    },

    emojiBuy(state, action) {
      state.user.point = action.payload.mypoint;
    },
    emojiList(state, action) {

      state.user.saveEmoji = action.payload.emojiList.sort((a, b) => a-b) ?? [1];
    },
    reset(state) {
      state.accessToken = "";
      state.refreshToken = "";
      state.isLoggined = false;
      state.user = {
        userId: null,
        nickname: "",
        point: 0,
        emojiId: null,
        oauthProvider: "",
        saveEmoji: [1],
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const authActions = authenticateSlice.actions;
export default authenticateSlice.reducer;
