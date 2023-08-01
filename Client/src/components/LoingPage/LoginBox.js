import { Link } from "react-router-dom";
import React from "react";
import "./LoginBox.css";
// import "./LoginKakaoPage"

const LoginBox = () => {
  const getKakaoAuthURL = () => {
    const kakaoAuthURL =
      "https://kauth.kakao.com/oauth/authorize" +
      "?client_id=" +
      process.env.REACT_APP_KAKAO_JS_KEY +
      "&redirect_uri=" +
      process.env.REACT_APP_KAKAO_REDIRECT_URI +
      "&response_type=code";
    window.location.href = kakaoAuthURL; // URL로 리다이렉트
  };

  return (
    <div className="login-box">
      <div>
        <img
          className="login-logo"
          src="/images/img/gaewoon-logo.png"
          alt="logoImg"
        />
      </div>

      <div className="login-font">게임으로 운동하자!!</div>
      <div className="mb-2">
        <img
          onClick={getKakaoAuthURL} // onClick 핸들러에서 함수 참조만 할 것
          src="/images/img/KakaoLoginBtn.png"
          alt="dsa"
        />
      </div>
      <div>
        <Link className="login-link">비회원으로 로그인 하기</Link>
      </div>
    </div>
  );
};

export default LoginBox;
