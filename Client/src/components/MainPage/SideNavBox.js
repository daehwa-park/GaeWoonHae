import {useNavigate} from "react-router-dom"
import RecommendModal from "./sideNavBox/RecommendModal"
import BgmModal from "./sideNavBox/bgmModal"
import {useState} from "react" 
import "./SideNavBox.css"
// import mainlogo from '../../images/img/mainlogo.png'
import {Link} from "react-router-dom"
import Navbutton from "./sideNavBox/navbutton"


function Mainnav() {
    // 1. navigate 선언
    const navigate = useNavigate();
    // 2. 함수로직 작성
    const goTomypage=() => {
        navigate("/mypage")
    };

    const [modalOpen, setModalOpen] = useState(false);
    const showModal = () => {
        setModalOpen(true);
    };

    const [modalOpen2, setModalOpen2] = useState(false);
    const showModal2 = () => {
        setModalOpen2(true);
    };


    return(
        <div>
            <img className="main-hover" src={`${process.env.PUBLIC_URL}/images/img/mainlogo.png`} alt=""/>
            {/* <button className="mainnav" onClick={goTomypage}>Profile</button> */}
            <Navbutton className="mainnav" onClick={goTomypage} message="Profile"></Navbutton>
            <div>
                <Navbutton className="mainnav" onClick={showModal} message="Enter code(친구초대)"></Navbutton>
                {/* <button className="mainnav" onClick={showModal}>Enter code(친구초대)</button> */}
                {modalOpen && <RecommendModal setModalOpen={setModalOpen} />}
            </div>
            <div>
                <Navbutton className="mainnav" onClick={showModal2} message="BGM"></Navbutton>
                {/* <button className="mainnav" onClick={showModal2}>BGM</button> */}
                {modalOpen2 && <BgmModal setModalOpen2={setModalOpen2} />}
            </div>
            <Link to="/"><Navbutton message="로그아웃"></Navbutton></Link>
        </div>
    )
}

export default Mainnav