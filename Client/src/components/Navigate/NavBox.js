// 메인페이지 좌측 네비게이션바
// 구성 - 버튼css (Navbutton) , 친구초대 모달창(RecommendModal), BGM 모달창 (BgmModal)

import {useNavigate} from "react-router-dom"
import logo from '../../assets/img/mainlogo.png'
import "./NavBox.css"

const Mainnav = () => {
    const navigate = useNavigate();
    const goTomainpage=() => {
        navigate("/main")
    };

    return(
        <div className="navbar-header">
            <img className="main-hover" onClick={goTomainpage} src={logo} alt=""/>
        </div>
    )
}

export default Mainnav