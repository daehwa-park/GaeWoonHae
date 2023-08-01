import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./roompage/LoginPage/LoginPage";
import MainPage from "./roompage/MainPage/MainPage";
import LobbyPage1 from "./roompage/Lobby/Lobby1";
import LobbyPage2 from "./roompage/Lobby/Lobby2";
import LobbyPage3 from "./roompage/Lobby/Lobby3";
import GamePage1 from "./roompage/GamePage/Game1";
import GamePage2 from "./roompage/GamePage/Game2";
import GamePage3 from "./roompage/GamePage/Game3";
import MyPage from "./roompage/MyPage/MyPage";
import LoginKakaoPage from "./components/LoginPage/LoginKakaoPage";

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
      <Route path="/lobby/1" element={<LobbyPage1 />} />
      <Route path="/lobby/2" element={<LobbyPage2 />} />
      <Route path="/lobby/3" element={<LobbyPage3 />} />
      {/* 게임페이지 Switch방식 */}
      <Route path="/gamepage/1" element={<GamePage1 />} />
      <Route path="/gamepage/2" element={<GamePage2 />} />
      <Route path="/gamepage/3" element={<GamePage3 />} />
      {/* 마이페이지 */}
      <Route path="/mypage" element={<MyPage />} />
      {/* 잘못된 경로로 들어갔을 경우 */}
      <Route path="*" element={<div>There's nothing here!</div>} />
    </Routes>
  );
}

export default App;
