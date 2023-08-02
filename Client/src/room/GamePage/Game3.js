import {Link} from 'react-router-dom'
import { useSelector} from "react-redux"  //Store에서 state값 가져오기

// 게임페이지3 - 공피하기

const Mypage = () => {
    const {A1} = useSelector((state) => state.Mypage)  // reducer 
    return (
        <div>
            <h1>공피하기-게임페이지3</h1>
            <h2>{A1}</h2>
 
            <Link to='/main'><button>메인으로 돌아가기</button></Link>
  

        </div>
    )
}

export default Mypage