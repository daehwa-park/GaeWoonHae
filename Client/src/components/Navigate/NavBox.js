// 네비게이션바 기본틀

import {useNavigate} from "react-router-dom"
import logo from '../../assets/img/purple_logo.png'
import "./NavBox.css"


// 메인페이지 이동

const Mainnav = () => {
    const navigate = useNavigate();
    const goTomainpage=() => {
        navigate("/main")
    };

    return(
        <div className="navbar-header">
            <img className="main-hover" onClick={goTomainpage} src={logo} alt="" />
        </div>
    )
}

export default Mainnav