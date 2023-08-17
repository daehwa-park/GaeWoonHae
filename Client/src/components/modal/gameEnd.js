// 이모지 구입 확인 모달
// 사용처 : 이모지 상점

import "./gameEnd.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



function GameEndModal({ setModalOpen, props }) {
    const navigate = useNavigate();
    const userList = props.renderingUserList;
    // 모달 끄기 
    const closeModal = () => {
        navigate(`/main`);
        // setModalOpen(false);
    };



    useEffect(() => {
        const fetchData = async () => {

            setModalOpen(true);
        }
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div id='Endmodals'>
            <div className="RankingHeader">🏆 게임 종료 랭킹 🏆</div>
            <div className="AllRecord">
                {userList.map((user, idx) => (
                    <div className="RecordBox" key={idx}>
                        <span className="Rank">
                            {idx + 1 === 1 ? "🥇"
                                : idx + 1 === 2 ? "🥈"
                                    : idx + 1 === 3 ? "🥉"
                                        : idx + 1 + "위"}
                        </span>
                        <span className="Username">{user.username}</span>
                        <span className="Count">{user.count}개</span>
                    </div>
                ))}
            </div>
            <div className="buttons">
                <button className="End-Button" onClick={closeModal} >🔙 나가기</button>
            </div>
        </div>
    );
}
export default GameEndModal;