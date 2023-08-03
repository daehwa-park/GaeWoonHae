import {Outlet} from 'react-router-dom'
import './MyPage.css'
import NavBox from "../../components/Navigate/NavBox"
import NavTitle from "../../components/Navigate/Mypagenav"
// import { useSelector, useDispatch} from "react-redux"  //Store에서 state값 가져오기
// import {updateA} from '../../redux/reducer/MyPageReducer'
// import { useEffect } from 'react'
// 마이페이지

const Mypage = () => {

    return (
        <div className='mypages'>
            {/* 상단 네비바 */}
            <NavBox className='mainnavbar'/>
            <NavTitle className='mypage-header'/>
            <div className='mypage-body'>
                <Outlet/>
            </div>
        </div>
    )
}

export default Mypage