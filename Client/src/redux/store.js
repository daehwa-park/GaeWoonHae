import {
  configureStore, // Redux 스토어를 생성하는 데 사용
  getDefaultMiddleware, // 기본 미들웨어 목록
} from "@reduxjs/toolkit";

//room에 위치한 state정리파일(Reducer) 가져오기

import authenticateReducer from "./reducer/authenticateReducer";
import MyPageReducer from "./reducer/MyPageReducer";

const store = configureStore({
  reducer: {
    auth: authenticateReducer,
    myPage: MyPageReducer,
  },
  middleware: getDefaultMiddleware({
    // 기본적으로 포함되어야할 미들웨어 목록
    serializableCheck: false,
  }),
});

export default store;
