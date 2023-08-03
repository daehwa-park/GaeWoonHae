import React from 'react'
import NavBox from "../../components/Navigate/NavBox"
import NavTitle from "../../components/Navigate/Mainnav"
import MainSlide from "../../components/MainPage/Mainslide"
import './MainPage.css'
// import { useEffect } from 'react'
// 메인페이지

const Mainpage=()=> {

    return (
        <div>
            <div className='maintitle'>
                {/* 상단 네비바 */}
                <div className='mainnavbar'><NavBox/></div>
                <div className='mainnavbar2'><NavTitle/></div>
                <div className='mainbody'>
                    {/* 게임 설명 */}
                    <div className='mainlog'><p className='gametext'>게임 설명</p></div>

                    {/* 게임입장 슬라이드 */}
                    <div className='maingame'><MainSlide/></div>
                </div>
            </div>
        </div>
    )
}

export default Mainpage