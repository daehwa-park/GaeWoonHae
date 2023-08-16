// 로그인 페이지 구성


// import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/reducer/authenticateReducer";
import "./LoginBox.css";
// import "./LoginKakaoPage"


const LoginBox = () => {
  const dispatch = useDispatch();

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

  useEffect(()=> {
    dispatch(authActions.reset());
  },[])

  return (
    <div className="login-box">
      <div>
        <img
          className="login-logo"
           src="/images/img/gif_logo.gif"
          alt="logoImg" 
        />
      </div>

      <div>
      <img
           src="/images/img/gamement.png"
          alt="logoImg"
        />
      </div>
      <div className="mb-2">
        <img
          onClick={getKakaoAuthURL} // onClick 핸들러에서 함수 참조만 할 것
          src="/images/img/KakaoLoginBtn.png"
          alt="dsa"
        />
      </div>
      {/* <div>
        <Link className="login-link">비회원 로그인</Link>
      </div> */}
    </div>
  );
};

export default LoginBox;
