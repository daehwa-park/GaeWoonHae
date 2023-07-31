import {useNavigate} from "react-router-dom"
import RecommendModal from "./sideNavBox/RecommendModal"
import BgmModal from "./sideNavBox/bgmModal"
import {useState} from "react" 
import "./SideNavBox.css"
import {Link} from "react-router-dom"

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
            <button className="mainnav" onClick={goTomypage}>Profile</button>
            <div>
                <button className="mainnav" onClick={showModal}>Enter code(친구초대)</button>
                {modalOpen && <RecommendModal setModalOpen={setModalOpen} />}
            </div>
            <div>
                <button className="mainnav" onClick={showModal2}>BGM</button>
                {modalOpen2 && <BgmModal setModalOpen2={setModalOpen2} />}
            </div>
            <Link to="/"><button>로그아웃</button></Link>
        </div>
    )
}

export default Mainnav