// 로그인 토큰과 유저 정보 데이터를 저장하는 리듀서입니다.
import { createSlice } from "@reduxjs/toolkit";

const roomInfoSlice = createSlice({
  name: "room",
  initialState: {
    sessionId: "",
    hostName: "",
    gameType: null,
    limitTime: 1,
    userList: [],
  },

  reducers: {
    //payload의 토큰들과 유저id를 state에 저장하는 리듀서 함수입니다.
    getRoomInfo(state, action) {
      state.sessionId = action.payload.sessionId;
      state.hostName = action.payload.hostName;
      state.gameType = action.payload.gameType;
    },
    // 스톰프 클라이언트를 저장하는 리듀서입니다.
    getGameUserList(state, action) {
      state.userList = action.payload.userList;
      state.limitTime = action.payload.limitTime;
    },
  },
});

export const roomActions = roomInfoSlice.actions;
export default roomInfoSlice.reducer;
