// 마이페이지 네비게이션바

import { useState} from "react"
import './Mypagenav.css'
import {useNavigate} from "react-router-dom"
import RecommendModal from "../modal/RecommendModal"
import logo from '../../assets/img/purple_logo.png'


const NavBoxTag = () => {

    const navigate = useNavigate();

    const goTomypage=() => {
        navigate("/mypage/profile")
    };
    
    const goToEmoji=() => {
        navigate("/mypage/emojishop")
    };

    const goTomainpage=() => {
        navigate("/main")
    };

    const [modalOpen, setModalOpen] = useState(false);

    const showModal = () => {
        setModalOpen(true);
    };

    return (
        <div className="navboxheader">
            {modalOpen && <RecommendModal setModalOpen={setModalOpen} />}
            <img className="main-hover" onClick={goTomainpage} src={logo} alt=""/>
            <div className="navbox-tag">
                {/* <div className="menu" onClick={showModal}>초대코드로 접속</div> */}
                <div className="menu" onClick={goToEmoji} >이모지 상점</div>
                <div className="menu" onClick={goTomypage}>마이페이지</div>
            </div>
        </div>
    )
}

export default NavBoxTag