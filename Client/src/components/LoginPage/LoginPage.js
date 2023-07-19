import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const loginKakaoApi = () => {
    // 여기에 Kakao API와 통신하는 로직을 구현하세요.
    // 통신이 성공하면 아래 코드를 실행하세요.
    navigate("/login-kakao");
  };

  return (
    <div>
      {/* 로그인 버튼을 클릭하면 loginKakaoApi() 함수 실행 */}
      <button onClick={loginKakaoApi}>로그인</button>
    </div>
  );
};

export default Login;