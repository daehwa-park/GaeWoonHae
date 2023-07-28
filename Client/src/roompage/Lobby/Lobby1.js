import {Link} from 'react-router-dom';

const Lobby=()=> {
    return (
        <div>
            <h1>박터트리기 대기방</h1>
            <Link to='/gamepage/1'><button>게임시작</button></Link>
            <Link to='/main'><button>방나가기</button></Link>
        </div>
    )
}

export default Lobby