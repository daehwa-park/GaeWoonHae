import {useNavigate} from "react-router-dom"
import RecommendModal from "./sideNavBox/RecommendModal"
import BgmModal from "./sideNavBox/bgmModal"
import {useState} from "react" 
import "./SideNavBox.css"
// import mainlogo from '../../images/img/mainlogo.png'
import Navbutton from "./sideNavBox/navbutton"


function Mainnav() {
    // 1. navigate 선언
    const navigate = useNavigate();
    // 2. 함수로직 작성
    const goTomypage=() => {
        navigate("/mypage")
    };
    const goToLoby=() => {
        navigate("/")
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
            <div className="left-nav">
                <Navbutton className="mainnav" onClick={goTomypage} message="Profile"></Navbutton>
                <div className="mainnav">
                    <Navbutton  onClick={showModal} message="Enter code(친구초대)"></Navbutton>
                    {modalOpen && <RecommendModal setModalOpen={setModalOpen} />}
                </div>
                <div className="mainnav">
                    <Navbutton onClick={showModal2} message="BGM"></Navbutton>
                    {modalOpen2 && <BgmModal setModalOpen2={setModalOpen2} />}
                </div >
                <Navbutton className="mainnav" onClick={goToLoby} message="로그아웃"></Navbutton>
            </div>
        </div>
    )
}

export default Mainnav