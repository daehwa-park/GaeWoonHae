import {Link} from 'react-router-dom'
// import { useSelector, useDispatch} from "react-redux"  //Store에서 state값 가져오기
// import {updateA} from '../../redux/reducer/MyPageReducer'

// 마이페이지

const Mypage = () => {
    // const dispatch = useDispatch();

    // // const handleClick = () => {
    // //     dispatch(updateA('새로운 1번'))
    // // }

    // const {A1} = useSelector((state) => state.Mypage)  // reducer 
    return (
        <div>
            <h1>마이페이지</h1>
            {/* <h2>{A1} dd</h2>
            <button onClick={handleClick}>Update A1</button> */}
            <Link to='/main'><button>메인으로 돌아가기</button></Link>
            <button>회원탈퇴</button>

        </div>
    )
}

export default Mypage