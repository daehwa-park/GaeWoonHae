import {Link} from 'react-router-dom';
import axios from "axios";
import './Lobby3.css'
// import {useNavigate} from "react-router-dom"

// 대기방 - 공피하기



const Lobby=()=> {
    // const navigate = useNavigate();

    const gamestart = async () => {
        try {
            const requestData = {
                sessionId : "session_id_asd",
            };
            const response = await axios.post(
                "http://localhost:5000/api/room/start", 
                requestData,
            );
            console.log(response)
            // navigate(`/lobby/${value}`)
            
        } catch (error) {
            console.error("생성 실패", error);
        }
    };

    return (
        <div>
            <h1>공피하기 대기방</h1>
            <button onClick={gamestart}>+</button>
            <Link to='/gamepage/1'><button>게임시작</button></Link>
            <Link to='/main'><button>방나가기</button></Link>
        </div>
    )
}

export default Lobby