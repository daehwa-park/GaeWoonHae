import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { authenticateAction } from "../../features/loginActions/authenticateAction";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/reducer/authenticateReducer";

const LoginKakaoPage = () => {
  // URL에 있는 코드 쿼리를 받아오기
  const [query] = useSearchParams(); //
  const authorizationCode = query.get("code");

  const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.user.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 백엔드에서 토큰을 얻기위해 미들웨어의 로그인 함수로 보냅니다.
  const getLoginTokens = () => {
    console.log("getLoginTokens 실행");
    dispatch(authenticateAction.getTokensUserId(authorizationCode));
  };
  // 토큰이 있으면 로그인, 없으면 로그아웃 상태를 store에 저장하자.
  const isToken = (accessToken) => {
    dispatch(authActions.loginJudgement({ accessToken }));
  };

  const getUserInfo = async () => {
    await dispatch(authenticateAction.getUserInfo(userId));
    await navigate("/main");
  };

  // 토큰이 없으면 getLoginToken 함수를 있으면 토큰이 있으면 로그인 여부 처리 함수를 실행한다.
  useEffect(() => {
    if (accessToken === "") {
      getLoginTokens();
    } else {
      isToken(accessToken);
      getUserInfo();
    }
  }, [accessToken, userId]);

  return <div>로그인 중입니다~</div>;
};

export default LoginKakaoPage;

// 아래는 응답과 요청을 인터셉트하여 성공 실패 유무를 확인하는 함수입니다.

// loginApi.interceptors.request.use(
//   function (config) {
//     //요청 송공시 요청 확인
//     console.log("request start", config);
//     return config;
//   },
//   function (error) {
//     // 요청 오류가 있는 작업 수행
//     console.log("request error", error);
//     return Promise.reject(error);
//   }
// );

// // 응답 인터셉터 추가하기
// loginApi.interceptors.response.use(
//   function (response) {
//     // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
//     // 응답 데이터가 있는 작업 수행
//     console.log("get response", response);
//     return response;
//   },
//   function (error) {
//     // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
//     // 응답 오류가 있는 작업 수행
//     console.log("get response", error);
//     return Promise.reject(error);
//   }
// );
