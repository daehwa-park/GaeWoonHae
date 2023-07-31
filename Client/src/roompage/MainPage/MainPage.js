// import { useSelector } from 'react-redux';
import React from 'react'
import SideNavBox from "../../components/MainPage/SideNavBox"
import MainSlide from "../../components/MainPage/Mainslide"
import './MainPage.css'


const Mainpage=(props)=> {
    // const num = useSelector((state) => state.A);  //리덕스  연습

    return (
        <div>
            <div className='maintitle'>
                {/* 좌측 네비바 */}
                <div className='mainnavber'><SideNavBox/></div>
                {/* 우측 게임입장 슬라이드 */}
                <div className='maingame'><MainSlide/></div>
            </div>
            {/* <h3>{num}</h3> */}

        </div>
    )
}

export default Mainpage