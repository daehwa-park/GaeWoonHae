import React from 'react'
import SideNavBox from "../../components/MainPage/NavBox"
import MainSlide from "../../components/MainPage/Mainslide"
import './MainPage.css'
import { useEffect } from 'react'
// 메인페이지

const Mainpage=(props)=> {
    const pagenum = 1
    
    useEffect(()=>{
        localStorage.setItem('pagenum','2')
        // const savechecknum = localStorage.getItem('mypagenum')
        // setChecknum(Number(savechecknum))
        // console.log(checknum,'확인@@@')
    },[])

    return (
        <div>
            <div className='maintitle'>
                {/* 상단 네비바 */}
                <div className='mainnavber'><SideNavBox pagenum={pagenum}/></div>
                <div className='mainbody'>
                    {/* 게임 설명 */}
                    <div className='mainlog'>게임 설명</div>

                    {/* 게임입장 슬라이드 */}
                    <div className='maingame'><MainSlide/></div>
                </div>
                
            </div>

        </div>
    )
}

export default Mainpage