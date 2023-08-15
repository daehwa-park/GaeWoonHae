import {Outlet} from 'react-router-dom'
import './MyPage.css'
import NavBox from "../../components/Navigate/NavBox"
import NavTitle from "../../components/Navigate/Mypagenav"
// import Calender2 from '../../components/calender/calender'
import { useEffect,useState } from "react";
// import { useSelector, useDispatch} from "react-redux"  //Store에서 state값 가져오기
// import {updateA} from '../../redux/reducer/MyPageReducer'
// import { useEffect } from 'react'
// 마이페이지

const Mypage = () => {

    const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      setCirclePosition({ x: clientX, y: clientY });
    };
  
    useEffect(()=> {
        window.addEventListener("mousemove", handleMouseMove);
    
        return ()=> {
          window.removeEventListener("mousemove", handleMouseMove);
        } 
    })
  
    return (
        <div className='mypages'>

            {/* 상단 네비바 */}
            {/* <Calender2></Calender2> */}
            <NavBox className='mainnavbar'/>
            <NavTitle className='mypage-header'/>
            <div className='mypage-body'>
                <Outlet/>
            </div>
        </div>
    )
}

export default Mypage