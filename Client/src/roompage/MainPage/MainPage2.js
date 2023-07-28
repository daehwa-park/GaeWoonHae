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
    const num = useSelector((state) => state.A);

    // const [modalOpen, setModalOpen] = useState(false);
    // const showModal = () => {
    //     setModalOpen(true);
    // };
    return (
        <div>
            <div className='mainheader'>
                <h1>메인페이지</h1>
            </div>
            <div className='maintitle'>
                {/* 좌측 네비바 */}
                <div className='mainnavber'> 
                    <MainNav />
                </div>
                {/* 우측 게임입장 슬라이드 */}
                <div className='maingame'>
                    <MainSlide />

                </div>
            </div>
            <h3>{num}</h3>


            {/*  */}
            <Link to='/'><button>로그아웃</button></Link>

            {/* <div>
                <button className='messagebtn' onClick={showModal}>버튼</button>
                {modalOpen && <ChatModal setModalOpen={setModalOpen} />}
            </div> */}
            {/* <ChatTest></ChatTest> */}
        </div>
    )
}

export default Mainpage