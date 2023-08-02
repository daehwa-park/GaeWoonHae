import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginKakaoPage = () => {

    const params = new URLSearchParams(window.location.search);
    const authorizationCode = params.get("code");

    const movePage = useNavigate()

    useEffect(()=> {
        axios.post(process.env.REACT_APP_SPRING_URI+"/api/oauth/login/kakao", {
            authorizationCode
        }).then((resp)=> {
            console.log(resp.data);
            
        }).catch((e)=> {
            console.log(e);
            movePage("/")
        })


    }, [])


  return (
    <div>
      로그인 중입니다~
    </div>
  );
};

export default LoginKakaoPage;