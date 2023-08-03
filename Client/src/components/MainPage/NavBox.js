// 메인페이지 좌측 네비게이션바
// 구성 - 버튼css (Navbutton) , 친구초대 모달창(RecommendModal), BGM 모달창 (BgmModal)

import {useNavigate} from "react-router-dom"
// import RecommendModal from "./NavBox/RecommendModal"
// import EmojiModal from "./NavBox/emojiModal"
// import {useState} from "react" 
import "./NavBox.css"
// import mainlogo from '../../images/img/mainlogo.png'
// import Navbutton from "./NavBox/navbutton"
import NavBoxTag from "./NavBox_Tag"


function Mainnav({pagenum}) {
    // // 1. navigate 선언
    const navigate = useNavigate();
    // // 2. 함수로직 작성
    const goTomainpage=() => {
        navigate("/main")
    };


    // const goToLoby=() => {
    //     navigate("/")
    // };
    // const goToEmoji=() => {
    //     navigate("/mypage")
    // };

    // const [modalOpen, setModalOpen] = useState(false);
    // // const [modalOpen2, setModalOpen2] = useState(false);

    // const showModal = () => {
    //     console.log('@확인', modalOpen)
    //     setModalOpen(true);
    //     console.log(modalOpen)
    // };

    // const showModal2 = () => {
    //     setModalOpen2(true);
    // };



    return(
        <div className="navbar-header">
                <img className="main-hover" onClick={goTomainpage} src={`${process.env.PUBLIC_URL}/images/img/mainlogo.png`} alt=""/>
                <div>{pagenum}</div>
                <NavBoxTag pagenum={pagenum} ></NavBoxTag>
        </div>
      
    )
}

export default Mainnav