// 초대코드 입장 모달
// 사용처: 메인페이지, 마이페이지

import "./RecommendModal.css"

function RecommendModal({ setModalOpen, id, title, content, writer }) {
    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div id='Recommendmodals'>
            <h3 id='codetxtRec'>초대 코드</h3>
            <input id='codeinputRec' type="text" placeholder="초대 코드 입력"></input>
            <div id='modalcomRec'>
                <p id='recombutton' >입장</p>
                <p id='recombutton' onClick={closeModal}>취소</p>
            </div>
        </div>
    );
}
export default RecommendModal;