import {Button} from '../common/Button';
import {Link} from 'react-router-dom';


const LoginPage=() => {
    return (
    <div>
        <h1>마이페이지</h1>
        <Link to="/main"><Button>메인으로 가기</Button></Link>

    </div>
    );
};

export default LoginPage;