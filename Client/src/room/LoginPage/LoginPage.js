import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { persistor } from "../../redux/store"; // 경로는 실제 프로젝트 경로로 수정하세요.
import LoginBox from "../../components/LoingPage/LoginBox";
import "./LoginPage.css";

const LoginPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
localStorage.clear();

persistor.purge();
  }, [dispatch]);

  return (
    <div className="login-bg">
      <LoginBox />
    </div>
  );
};

export default LoginPage;