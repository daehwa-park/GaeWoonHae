import "./App.css";

import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import MainPage from "./components/MainPage/MainPage";
import LobbyPage from "./components/Lobby/Lobby";
import GamePage from "./components/GamePage/GamePage";
import MyPage from "./components/MyPage/MyPage";
import LoginKaKao from "./components/LoginPage/LoginKakao";

const App = () => {
  return (
    <Routes>
      {/* 카카오 로그인 후 페이지 */}
      <Route path="/login-kakao" element={<LoginKaKao />} />
      {/* 로그인페이지 */}
      <Route path="/" element={<LoginPage />} />
      {/* 메인페이지 */}
      <Route path="/main" element={<MainPage />} />
      {/* 선택한 게임 로비페이지 */}
      <Route path="/lobby/:gameid" element={<LobbyPage />} />
      {/* 해당 게임페이지 */}
      <Route path="/gamepage/:gameid" element={<GamePage />} />
      {/* 마이페이지 */}
      <Route path="/mypage" element={<MyPage />} />
      {/* 잘못된 경로로 들어갔을 경우 */}
      <Route path="*" element={<div>There's nothing here!</div>} />
    </Routes>
  );
};

export default App;
