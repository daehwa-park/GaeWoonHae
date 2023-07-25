import {Link} from 'react-router-dom';

const LoginPage = () => {

  const url = 'https://kauth.kakao.com/oauth/authorize?client_id=' +
    process.env.REACT_APP_KAKAO_JS_KEY +
    '&redirect_uri=' +
    process.env.REACT_APP_KAKAO_REDIRECT_URI +
    '&response_type=code';


  return (
    <div>
      <h1>로그인페이지</h1>
      <Link to='/main'><button>네이버 로그인</button></Link>
      <a href={url}><button>카카오 로그인</button></a>
    </div>
  );
};

export default LoginPage