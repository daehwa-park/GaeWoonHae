import "./bgmModal.css"

const BgmModal = ({ setModalOpen2, id, title, content, writer }) => {
    // 모달 끄기 
    const closeModal = () => {
        console.log('asdfdsafds')
        setModalOpen2(false);
    };

    return (
        <div id='Recommendmodals'>
            <h3>bgm 설정</h3>
            
            <button id='chatoutbutton' onClick={closeModal}>취소</button>
        </div>
    );

}


export default BgmModal