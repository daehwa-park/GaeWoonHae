import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectPage = () => {
  const navigate = useNavigate();

  const requestKakaoUserInfo = () => {
    // 여기에 Kakao API와 통신하는 로직을 구현하세요.
    // 통신이 성공하면 아래 코드를 실행하세요.
    navigate("/main");
  };

  useEffect(() => {
    // 페이지가 로드되면 requestKakaoUserInfo() 함수를 실행합니다.
    requestKakaoUserInfo().catch((error) => {
      // 통신 실패 시 에러 메시지를 출력하고, 로그인 페이지로 이동합니다.
      alert("error message: " + error.message);
      navigate("/login");
    });
  }, []);

  return (
    <div>
      <p>가운데 로그인을 진행하고 있습니다</p>
    </div>
  );
};

export default RedirectPage;
