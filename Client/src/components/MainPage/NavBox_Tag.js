
import Navbutton from "./NavBox/navbutton"
import { useState} from "react"
import './NavBox_Tag.css'
import {useNavigate} from "react-router-dom"
import RecommendModal from "./NavBox/RecommendModal"
import { useDispatch,useSelector} from "react-redux";
import { authenticateAction } from "../../features/Actions/authenticateAction";
//../../features/Actions/authenticateAction";
const NavBoxTag = ( { pagenum } ) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.user.userId);

    // 1. navigate 선언
    const navigate = useNavigate();
    // 2. 함수로직 작성
    const goTomypage=() => {
        navigate("/mypage")
    };
    
    const goToEmoji=() => {
        navigate("/mypage")
    };

    const logout=() => {
        dispatch(authenticateAction.userLogout(userId));
        navigate("/")
    };

    const [modalOpen, setModalOpen] = useState(false);

    const showModal = () => {
        setModalOpen(true);
    };

    return (
        <div>
            {pagenum === 1 && (
                <div className="navbox-tag">
                    {modalOpen && <RecommendModal setModalOpen={setModalOpen} />}
                    <Navbutton  onClick={showModal} message="코드 접속"></Navbutton>
                    <Navbutton onClick={goToEmoji} message="이모지 상점"></Navbutton>
                    <Navbutton className="mainnav" onClick={logout} message="로그아웃"></Navbutton>
                    <Navbutton className="mainnav" onClick={goTomypage} message="마이페이지(아이콘)"></Navbutton>
                </div>
            )}
            {pagenum === 2 && (
                <div className="navbox-tag">
                    {modalOpen && <RecommendModal setModalOpen={setModalOpen} />}
                    <Navbutton  onClick={showModal} message="초대 코드"></Navbutton>
                    <Navbutton onClick={goToEmoji} message="이모지 상점"></Navbutton>
                    <Navbutton className="mainnav" onClick={goTomypage} message="마이페이지"></Navbutton>
                </div>
            )}

        </div>
    )
}

export default NavBoxTag