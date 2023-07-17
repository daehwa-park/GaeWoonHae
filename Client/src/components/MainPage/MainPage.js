import {Button} from '../../components/common/Button';
import {Link} from 'react-router-dom';

const LoginPage=() => {
    return (
        <div>
            <h1>메인</h1>
            <Link to="/lobby/1"><Button>박터트리기</Button></Link>
            <Link to="/lobby/2"><Button>픽토그램</Button></Link>
            <Link to="/lobby/3"><Button>공 피하기</Button></Link><br />
            <Link to="/mypage"><Button>마이페이지</Button></Link><br />

            <Link to="/"><Button>로그아웃</Button></Link>
        </div>
    )
};

export default LoginPage;