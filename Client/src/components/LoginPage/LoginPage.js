import { StyledLoginimage, StyledLoginbutton, Button }from '../../components/common/Button';
import {Link} from 'react-router-dom';


const LoginPage=() => {

    const url = 'https://kauth.kakao.com/oauth/authorize?client_id=' +
    process.env.REACT_APP_KAKAO_JS_KEY +
    '&redirect_uri=' +
    process.env.REACT_APP_KAKAO_REDIRECT_URI +
    '&response_type=code&' +
    'scope=account_email profile_nickname'


    console.log(process.env.REACT_APP_KAKAO_JS_KEY)
    console.log(process.env.REACT_APP_KAKAO_REDIRECT_URI)



    return (
    <div>
        <h1>로그인 페이지</h1>
        <Link to="/main"><Button>로그인</Button></Link>
        <a href={url}>카카오 로그인</a>
        <StyledLoginimage>버튼</StyledLoginimage>
        <StyledLoginbutton>버튼</StyledLoginbutton>
    </div>
    );
};

export default LoginPage;