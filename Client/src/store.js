import {
  combineReducers, // 여러 개의 리듀서(reducer)를 하나로 결합하는데 사용되는 함수
  configureStore, // Redux 스토어를 생성하는 데 사용
  getDefaultMiddleware, // 기본 미들웨어 목록
} from "@reduxjs/toolkit";

//room에 위치한 state정리파일(Reducer) 가져오기
import MypageReducer from "./roompage/MyPage/MyPageReducer";

// 여러 개의 리듀서(reducer)를 하나로 결합
const reducers = combineReducers({
  Mypage: MypageReducer,
});

const Store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware({
    // 기본적으로 포함되어야할 미들웨어 목록
    serializableCheck: false,
  }),
});

export default Store;
