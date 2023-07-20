import React from "react";

const kakaoLoginAPI = `https://kauth.kakao.com/oauth/authorize?
client_id=${process.env.REACT_APP_KAKAO_JS_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

const Login = () => {

  const loginKakaoApi = () => {

    window.location.href = kakaoLoginAPI;

  };

  return (
    <div>
      {/* 로그인 버튼을 클릭하면 loginKakaoApi() 함수 실행 */}
      <button onClick={loginKakaoApi}>로그인</button>
    </div>
  );
};

export default Login;