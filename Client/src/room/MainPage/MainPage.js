import React, { useEffect } from 'react'
import NavBox from "../../components/Navigate/NavBox"
import NavTitle from "../../components/Navigate/Mainnav"
import MainSlide from "../../components/MainPage/Mainslide"
import './MainPage.css'
import { useDispatch, useSelector } from "react-redux";
import { authenticateAction } from "../../features/Actions/authenticateAction";


// 메인페이지

const Mainpage=()=> {
    const userId = useSelector((state) => state.auth.user.userId);
    const dispatch = useDispatch();
    useEffect(()=>{
        //유저 정보 받아오기
        dispatch(authenticateAction.getUserInfo(userId));
    })

    return (
        <div>
            <div className='maintitle'>
                {/* 상단 네비바 */}
                <NavBox className='mainnavbar'/>
                <NavTitle className='mainnavbar2'/>
                <div className='mainbody'>
                    {/* 게임입장 슬라이드 */}
                    {/* <div className='maingame'> */}
                        <div className='maingame-container'>
                            <MainSlide />
                        </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default Mainpage