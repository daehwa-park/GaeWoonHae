import { Link } from "react-router-dom";
import React from "react";
import "./LoginPage.css";


const LoginBox = () => {
  return (
    <div className="login-box">
      <div>
        <img
          className="login-logo"
          src="/images/img/gaewoon-logo.png"
          alt="logoImg"
        />
      </div>

      <div className="login-font">게임으로 운동하자</div>
      <div>
        <Link to="/main">
          <img src="/images/img/KakaoLoginBtn.png" alt="dsa" />
        </Link>
      </div>
      <div>
        <Link>비회원으로 로그인 하기</Link>
      </div>
    </div>
  );
};

export default LoginBox;
