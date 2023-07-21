import {Link} from 'react-router-dom'

const mypage = () => {
    return (
        <div>
            <h1>마이페이지</h1>

            <Link to='/main'><button>메인으로 돌아가기</button></Link>
            <button>회원탈퇴</button>

        </div>
    )
}

export default mypage