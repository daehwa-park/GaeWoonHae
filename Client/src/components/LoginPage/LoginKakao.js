import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const RedirectPage = () => {
  const navigate = useNavigate();

  const requestKakaoUserInfo = () => {

    const urlParams = new URL(window.location.href).searchParams;

    const code = urlParams.get('code');

    console.log(code)

    // 여기에 Kakao API와 통신하는 로직을 구현하세요.
    // 통신이 성공하면 아래 코드를 실행하세요.

    const url = "http://localhost:5000/api/auth/kakao"
    const data = {
      authorizationCode : code,
    }

    axios.post(url, data)
      .then((resp) => {
        console.log(resp);
        navigate("/main");})
      .catch((e) => {
        console.log(e);
        navigate("/login")
      }
      )   
  };

  useEffect(() => {
    // 페이지가 로드되면 requestKakaoUserInfo() 함수를 실행합니다.
    requestKakaoUserInfo();
  }, []);


  return (
    <div>
      <p>로그인을 진행하고 있습니다</p>
    </div>
  );
};

export default RedirectPage;
