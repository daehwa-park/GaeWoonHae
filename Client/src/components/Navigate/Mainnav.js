import { useState} from "react"
import './Mainnav.css'
import {useNavigate} from "react-router-dom"
import RecommendModal from "../modal/RecommendModal"
import { useDispatch,useSelector} from "react-redux";
import { authenticateAction } from "../../features/Actions/authenticateAction";
import mypageicon from "../../assets/img/mypage_icon.png"
import logo from '../../assets/img/mainlogo.png'

// 메인페이지 네비게이션바 메뉴버튼

const NavBoxTag = ( ) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.user.userId);

    const navigate = useNavigate();

    const goTomypage=() => {
        navigate("/mypage/profile")
    };
    
    const goToEmoji=() => {
        navigate("/mypage/emojishop")
    };

    const logout=() => {
        dispatch(authenticateAction.userLogout(userId));
        navigate("/")
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
                <div className="menu" onClick={showModal}>코드 접속</div>
                <div className="menu" onClick={goToEmoji} >이모지 상점</div>
                <div className="menu" onClick={logout}>로그아웃</div>
                <img className="mypageicon"  onClick={goTomypage} src={mypageicon} alt="go mypage" />
            </div>
        </div>
    )
}

export default NavBoxTag