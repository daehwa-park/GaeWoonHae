// 로그인 토큰과 유저 정보 데이터를 저장하는 리듀서입니다.
import { createSlice } from "@reduxjs/toolkit";

const emojishopSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: "",
    refreshToken: "",
    isLoggined: false,
    emoji: {
      emojiId: null,
      emojiPrice: null,
      point: null,
    },
  },

  reducers: {
    //payload의 토큰들과 유저id를 state에 저장하는 리듀서 함수입니다.
    emojishopdata(state, action) {
      state.emoji.emojiId = action.payload.emojiId;
      state.emoji.emojiPrice = action.payload.emojiPoint;
    },

    emojiBuy(state, action) {
      state.accessToken = action.payload.tokens.accessToken;
      state.refreshToken = action.payload.tokens.refreshToken;
      state.user.userId = action.payload.userId;
    },

  },
});

export const emojiActions = emojishopSlice.actions;
export default emojishopSlice.reducer;
