import './App.css';
import { Route, Routes } from 'react-router-dom'; 
import LoginPage from './roompage/LoginPage/LoginPage';
import LoginKakaoPage from './roompage/LoginPage/LoginKakaoPage';
import MainPage from './roompage/MainPage/MainPage';
import LobbyPage from './roompage/Lobby/Lobby';
import GamePage1 from './roompage/GamePage/Game1';
import MyPage from './roompage/MyPage/MyPage';

// const GameLoomList = () => {
//   return (
//     <div>

//     </div>
//   )
// }

function App() {
  return (
    <Routes>
      {/* 로그인페이지 */}
      <Route path='/' element={<LoginPage/>}/>
      {/* 카카오 로그인페이지 */}
      <Route path='/login/kakao/callback' element={<LoginKakaoPage/>}/>
      {/* 메인페이지 */}
      <Route path='/main' element={<MainPage/>}/>
      {/* 선택한 게임 로비페이지 */}
      <Route path='/lobby/:gameid' element={<LobbyPage/>}/>
      {/* 게임페이지 Switch방식 */}
      <Route path='/gamepage/:gameid' element={<GamePage1/>}/>
      {/* 마이페이지 */}
      <Route path='/mypage' element={<MyPage/>}/>
      {/* 잘못된 경로로 들어갔을 경우 */}
      <Route path ="*" element = {<div>There's nothing here!</div>} />
    </Routes>
  );
}

export default App;
