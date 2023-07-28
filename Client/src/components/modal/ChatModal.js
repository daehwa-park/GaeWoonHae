import styles from './ChatModal.css';
import Chatting from './Chatting'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { fachevronleft } from "@fortawesome/free-solid-svg-icons";

function ChatModal({ setModalOpen, id, title, content, writer }) {
    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div id='chatmodals' className={styles.modalcontainer}>
            <div id='chatheader'>
                {/* <FontAwesomeIcon icon={fachevronleft} /> */}
                <button id='chatoutbutton' className={styles.close} onClick={closeModal}>x</button>
                <p id='chattitle' style={{textAlign:'center'}}>박 터트리기 방</p>
            </div>
            <div id='chatbody'>
                <Chatting id='chatmodal'></Chatting>
            </div>
        </div>
    );
}
export default ChatModal;