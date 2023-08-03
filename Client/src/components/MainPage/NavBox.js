// 메인페이지 좌측 네비게이션바
// 구성 - 버튼css (Navbutton) , 친구초대 모달창(RecommendModal), BGM 모달창 (BgmModal)

import {useNavigate} from "react-router-dom"
import RecommendModal from "./NavBox/RecommendModal"
import BgmModal from "./NavBox/bgmModal"
import {useState} from "react" 
import "./NavBox.css"
// import mainlogo from '../../images/img/mainlogo.png'
import Navbutton from "./NavBox/navbutton"


function Mainnav() {
    // 1. navigate 선언
    const navigate = useNavigate();
    // 2. 함수로직 작성
    const goTomypage=() => {
        navigate("/mypage")
        console.log('asdf')
    };
    const goToLoby=() => {
        console.log('asdf')
        navigate("/")
   
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);

    const showModal = () => {
        console.log('@확인', modalOpen)
        setModalOpen(true);
        console.log(modalOpen)
    };

    const showModal2 = () => {
        setModalOpen2(true);
    };



    return(
        <div>
            <img className="main-hover" src={`${process.env.PUBLIC_URL}/images/img/mainlogo.png`} alt=""/>
            {modalOpen && <RecommendModal setModalOpen={setModalOpen} />}
            <div className="left-nav">
                <div className="mainnav">
                     <Navbutton className="mainnav" onClick={goTomypage} message="Profile"></Navbutton>
                </div>
                <div className="mainnav">
                    <Navbutton  onClick={showModal} message="Enter code(친구초대)"></Navbutton>
                </div>
                <div className="mainnav">
                    <Navbutton onClick={showModal2} message="BGM"></Navbutton>
                    {modalOpen2 && <BgmModal setModalOpen2={setModalOpen2} />}
                </div >
                <div className="mainnav">
                    <Navbutton className="mainnav" onClick={goToLoby} message="로그아웃"></Navbutton>
                </div>
            </div>
        </div>
    )
}

export default Mainnav