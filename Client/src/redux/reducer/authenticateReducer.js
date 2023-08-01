import { createSlice } from "@reduxjs/toolkit";

const authenticateSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: "",
    refreshToken: "",
    isLoggined: false,
    user: {
      userId: null,
    },
  },
  reducers: {
    getTokensUserId(state, action) {
      state.accessToken = action.payload.tokens.accessToken;
      state.refreshToken = action.payload.tokens.refreshToken;
      state.user.userId = action.payload.userId;
    },
    loginJudgement(state, action) {
      if (action.payload.accessToken) {
        state.isLoggined = true;
      } else {
        state.isLoggined = false;
      }
    },
  },
});

export const authActions = authenticateSlice.actions;
export default authenticateSlice.reducer;
