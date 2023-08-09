// 메인페이지 네비게이션바

import { useState} from "react"
import './Mainnav.css'
import {useNavigate} from "react-router-dom"
import RecommendModal from "../modal/RecommendModal"
import { useDispatch,useSelector} from "react-redux";
import { authenticateAction } from "../../features/Actions/authenticateAction";
import mypageicon from "../../assets/img/mypage_icon.png"
import logo from '../../assets/img/purple_logo.png'


const NavBoxTag = ( ) => {
    // 유저Id 정보
    const userId = useSelector((state) => state.auth.user.userId);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 마이페이지 이동
    const goTomypage=() => {
        navigate("/mypage/profile")
    };
    // 이모지상점 이동
    const goToEmoji=() => {
        navigate("/mypage/emojishop")
    };
    // 로그아웃
    const logout=() => {
        dispatch(authenticateAction.userLogout(userId));
        navigate("/")
    };
    // 메인페이지 이동
    const goTomainpage=() => {
        navigate("/main")
    };
    
    // 모달창 설정
    const [modalOpen, setModalOpen] = useState(false);

    const showModal = () => {
        setModalOpen(true);
    };

    return (
        <div className="navboxheader">
            {modalOpen && <RecommendModal setModalOpen={setModalOpen} />}
            <img className="main-hover" onClick={goTomainpage} src={logo} alt=""/>
            <div className="navbox-tag">
                <div className="menu" onClick={showModal}>코드 접속</div>
                <div className="menu" onClick={goToEmoji} >이모지 상점</div>
                <div className="menu" onClick={logout}>로그아웃</div>
                <img className="mypageicon"  onClick={goTomypage} src={mypageicon} alt="go mypage" />
            </div>
        </div>
    )
}

export default NavBoxTag