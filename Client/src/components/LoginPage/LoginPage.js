import { StyledLoginimage, StyledLoginbutton, Button }from '../../components/common/Button';
import {Link} from 'react-router-dom';


const LoginPage=() => {
    return (
    <div>
        <h1>로그인 페이지</h1>
        <Link to="/main"><Button>로그인</Button></Link>
        <StyledLoginimage>버튼</StyledLoginimage>
        <StyledLoginbutton>버튼</StyledLoginbutton>
    </div>
    );
};

export default LoginPage;