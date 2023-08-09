import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { persistor } from "../../redux/store"; // 경로는 실제 프로젝트 경로로 수정하세요.
import LoginBox from "../../components/LoingPage/LoginBox";
import "./LoginPage.css";

const LoginPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // 1. Redux 스토어 초기화
    // 모든 리듀서에 대한 초기화 액션을 디스패치하세요. 예를 들면:
    // dispatch({ type: "RESET_YOUR_REDUCER" });

// 2. localStorage 초기화
localStorage.clear();

// 3. redux-persist 데이터 초기화
persistor.purge();
  }, [dispatch]);

  return (
    <div className="login-bg">
      <LoginBox />
    </div>
  );
};

export default LoginPage;