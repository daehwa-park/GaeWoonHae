import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./room/LoginPage/LoginPage";
import MainPage from "./room/MainPage/MainPage";
import LobbyPage from "./room/Lobby/Lobby";

import GamePage from "./room/GamePage/GamePage";
import MyPage from "./room/MyPage/MyPage";
import Profile from "./components/mypage/myprofile";
import EmojiShop from "./components/mypage/emojishop";
import LoginKakaoPage from "./components/LoingPage/LoginKakaoPage";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <Routes>
      {/* 로그인페이지 */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login/kakao/callback" element={<LoginKakaoPage />} />
  {/* 메인페이지 */}
      <Route path="/main" element={<MainPage />} />
      {/* 선택한 게임 로비페이지 */}
      <Route path="/lobby/:gametype/:sessinid" element={<LobbyPage />} />

  {/* 게임페이지 Switch방식 */}
  <Route path="/gamepage/" element={<GamePage />} />
  {/* 마이페이지 */}
  <Route path="/mypage/" element={<MyPage />}>
    <Route path="profile" element={<Profile />} />
    <Route path="emojishop" element={<EmojiShop />} />
  </Route>
  {/* 잘못된 경로로 들어갔을 경우 */}
  <Route path="*" element={<div>There's nothing here!</div>} />
</Routes>
//1. 로비 /public /select_id/세션id
// 2. 로비 /시크릿 /select_id/세션id
// game1 /세션id/
// game2 /세션id/
// game3 /세션id/
  );
}

export default App;

