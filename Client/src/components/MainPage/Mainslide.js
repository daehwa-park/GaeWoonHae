
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, {useState}  from "react";
import Slider from "react-slick";
import GoLobby from "./mainslide/goLobby"


function Mainslide() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    const [LobbymodalOpen1, setLobbyModalOpen1] = useState(false);
    const showLobbyModal1 = () => {
        setLobbyModalOpen1(true);
    };
    const [LobbymodalOpen2, setLobbyModalOpen2] = useState(false);
    const showLobbyModal2 = () => {
        setLobbyModalOpen2(true);
    };
    const [LobbymodalOpen3, setLobbyModalOpen3] = useState(false);
    const showLobbyModal3 = () => {
        setLobbyModalOpen3(true);
    };

    return(
        <div>
            <div>
                <button className="mainnav" onClick={showLobbyModal1}>박터트리기-게임선택</button>
                {LobbymodalOpen1 && <GoLobby value={1} setModalOpen={setLobbyModalOpen1} />}
            </div>
            <div>
                <button className="mainnav" onClick={showLobbyModal2}>픽토그램-게임선택</button>
                {LobbymodalOpen2 && <GoLobby value={2} setModalOpen={setLobbyModalOpen2} />}
            </div>
            <div>
                <button className="mainnav" onClick={showLobbyModal3}>공피하기-게임선택</button>
                {LobbymodalOpen3 && <GoLobby value={3} setModalOpen={setLobbyModalOpen3} />}
            </div>
                        {/* 슬라이드 작업 */}
            {/* <Link to='/gamepage/1'><button>박터트리기-게임선택</button></Link>
            <Link to='/'><button>게임선택</button></Link>
            <Link to='/'><button>게임선택</button></Link> */}


             <Slider {...settings}>

                <div>
                    {/* <button className="mainnav" onClick={showLobbyModal}>박터트리기-게임선택</button>
                    {LobbymodalOpen && <GoLobby value={1} setModalOpen={setLobbyModalOpen} />}
                </div>

                <div>
                    <button className="mainnav" onClick={showLobbyModal}>픽토그램-게임선택</button>
                    {LobbymodalOpen && <GoLobby value={2} setModalOpen={setLobbyModalOpen} />}
                </div>
                <div>
                    <button className="mainnav" onClick={showLobbyModal}>공피하기-게임선택</button>
                    {LobbymodalOpen && <GoLobby value={3} setModalOpen={setLobbyModalOpen} />} */}
                </div>
            </Slider>

        </div>
    )
}

export default Mainslide