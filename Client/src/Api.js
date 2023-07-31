import axios from "axios";

const loginApi = axios.create({
    baseURL:process.env.REACT_APP_SPRING_URI,
    headers:{"cotent-type":"application/json"},
    timeout: 5000,
})

loginApi.interceptors.request.use(function (config) {
    //요청 송공시 요청 확인
    console.log("request start", config)
    return config;
  }, function (error) {
    // 요청 오류가 있는 작업 수행
    console.log("request error", error)
    return Promise.reject(error);
  });

// 응답 인터셉터 추가하기
loginApi.interceptors.response.use(function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    console.log("get response", response)
    return response;
  }, function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    console.log("get response", error)
    return Promise.reject(error);
  });

  export default loginApi