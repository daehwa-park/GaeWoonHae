import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
import React from 'react'
// import React, {useState} from 'react'
// import ChatModal from "../../components/modal/ChatModal"
// import ChatTest from '../../components/modal/ChatTest'
import MainNav from "../../components/navbar/mainnavbar"
import MainSlide from "../../components/slide/slide"
import './MainPage.css'




// import Swiper styles
// import 'swiper/css';


const Mainpage=(props)=> {
    const num = useSelector((state) => state.A);  //리덕스  연습

    return (
        <div>
            <div className='mainheader'>
                <h1>메인페이지</h1>
            </div>
            <div className='maintitle'>
                {/* 좌측 네비바 */}
                <MainNav className='mainnavber'/>
                {/* 우측 게임입장 슬라이드 */}
                <MainSlide className='maingame'/>
            </div>
            <h3>{num}</h3>


            {/*  */}
            <Link to='/'><button>로그아웃</button></Link>
        </div>
    )
}

export default Mainpage