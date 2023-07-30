import "./RecommendModal.css"

function RecommendModal({ setModalOpen, id, title, content, writer }) {
    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div id='Recommendmodals'>
            <h3>친구초대</h3>
            <input type="text"></input>
            <button id='chatoutbutton' onClick={closeModal}>취소</button>
        </div>
    );
}
export default RecommendModal;