import {Link} from 'react-router-dom'
import { useSelector} from "react-redux"  //Store에서 state값 가져오기


const Mypage = () => {
    const {A1} = useSelector((state) => state.Mypage)  // reducer 
    return (
        <div>
            <h1>마이페이지</h1>
            <h2>{A1}</h2>
 
            <Link to='/main'><button>메인으로 돌아가기</button></Link>
            <button>회원탈퇴</button>

        </div>
    )
}

export default Mypage