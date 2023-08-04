import {
  combineReducers,
  configureStore, // Redux 스토어를 생성하는 데 사용
  getDefaultMiddleware, // 기본 미들웨어 목록
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//room에 위치한 state정리파일(Reducer) 가져오기

import authenticateReducer from "./reducer/authenticateReducer";
import roomInfoReducer from "./reducer/roomInfoReducer";
import emojiInfoReducer from "./reducer/emojishopReducer";

const rootReducer = combineReducers({
  auth: authenticateReducer,
  roomInfo: roomInfoReducer,
  emoji: emojiInfoReducer,
  // 다른 리듀서들 추가하기
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "roomInfo","emoji"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    // 기본적으로 포함되어야할 미들웨어 목록
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

export default store;
