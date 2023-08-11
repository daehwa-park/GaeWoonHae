import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  sessionId: "",
  hostName: "",
  gameType: null,
  limitTime: Number(60),
  userList: [],
};
const roomInfoSlice = createSlice({
  name: "room",
  initialState,

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
    },
    getLimitTime(state, action) {
      state.limitTime = Number(action.payload.limitTime);
    },
    resetRoomInfo: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const roomActions = roomInfoSlice.actions;
export default roomInfoSlice.reducer;