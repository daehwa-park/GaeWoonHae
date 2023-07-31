import { useEffect } from "react";
import { useNavigate, useSearchParam } from "react-router-dom";
import loginApi from "../../Api";
const LoginKakaoPage = () => {

    // const params = new URLSearchParams(window.location.search);
  const [query] = useSearchParam()
    const authorizationCode = query.get("code");

    const navigate = useNavigate()

    const getLoginTokens = () => {
      loginApi.post("/api/oauth/login/kakao",{
        authorizationCode
      }).then()
      .catch((err) => {
        navigate("/")
      })
    }
    useEffect(()=> {
      getLoginTokens()

    }, [])


  return (
    <div>
      로그인 중입니다~
    </div>
  );
};

export default LoginKakaoPage;