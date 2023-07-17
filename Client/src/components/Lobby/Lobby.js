import {Button} from '../../components/common/Button';
import {Link, useParams} from 'react-router-dom';

const LoginPage=() => {
    const {gameid} = useParams();
    return (
        <div>
            <h1>대기화면 {gameid} </h1>
            <Link to={`/gamepage/${gameid}`}><Button>시작</Button></Link>
            <Link to="/main"><Button>나가기</Button></Link>
        </div>
    )
};

export default LoginPage;