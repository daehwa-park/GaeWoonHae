// 이모지 구입 확인 모달
// 사용처 : 이모지 상점

import "./gameEnd.css"

import { useEffect } from "react";



function GameEndModal({ setModalOpen }) {

    
    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };

   

    useEffect(()=> {
        const fetchData = async () => {
    
        }
        fetchData();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div id='Endmodals'>
            <div>
                <h3 id='codetxt3'>게임이 종료 되었습니다.</h3>
                <div id='Endmodal'>
                    <p id='Endbutton' >메인페이지로</p>
                    <p id='Endbutton' onClick={closeModal()} >나가기</p>
                </div>
            </div>
        </div>
    );
}
export default GameEndModal;