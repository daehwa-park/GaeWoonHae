import {Link} from 'react-router-dom'


const Mainpage=()=> {
    return (
        <div>
            <h1>메인페이지</h1>
    
            {/* nav */}
            <button>main</button>
            <Link to='/mypage'><button>Profile</button></Link>
            
            <button>Enter code(친구초대)</button>
            <button>BGM</button>
    
            {/* 모달+ */}
            {/* 슬라이드 작업 */}
            <Link to='/gamepage/1'><button>박터트리기-게임선택</button></Link>
            <Link to='/'><button>게임선택</button></Link>
            <Link to='/'><button>게임선택</button></Link>
            {/*  */}
            <Link to='/'><button>로그아웃</button></Link>
        </div>
    )
}

export default Mainpage