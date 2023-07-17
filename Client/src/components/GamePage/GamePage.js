import {Button} from '../../components/common/Button';
import {Link, useParams} from 'react-router-dom';

const LoginPage=() => {
    const {gameid} = useParams();
    if (gameid==='1') {
        console.log(gameid)
        return (
            <div>
                <h1>박터트리기</h1>
                <Link to="/main"><Button>방나가기</Button></Link>
            </div>
        )
    } else if (gameid==='2') {
        return (
            <div>
                <h1>픽토그램</h1>
                <Link to="/main"><Button>방나가기</Button></Link>
            </div>
        )
    } else if (gameid==='3') {
        return (
            <div>
                <h1>공 피하기</h1>
                <Link to="/main"><Button>방나가기</Button></Link>
            </div>
        )
    }
};

export default LoginPage;