import {Link} from 'react-router-dom';

const LoginPage=()=> {
    return (
        <div>
            <h1>로그인페이지</h1>
            <Link to='/main'><button>네이버 로그인</button></Link>
        </div>
    )
}

export default LoginPage