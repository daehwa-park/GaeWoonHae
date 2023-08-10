
import "./ShowPointHistory.css"
import axios from "axios";
import{ useEffect, useState } from "react";
function ShowPointHistory({ setModalOpen, userId}) {
    
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
    
    const [history, setHistory] = useState([]);
    const recordApi = axios.create({
        baseURL: process.env.REACT_APP_SPRING_URI,
        headers: { "cotent-type": "application/json" },
      });

    const newData = [];

    useEffect(()=>{
        const fetchData = async () => {
            recordApi
            .get("/api/point/history/"+userId)
            .then((res)=>{
                console.log("포인트 췍")
                console.log(res)
                
                for (var i = 0; i < res.data.data.length ; i++) {
                    newData.push({ point: res.data.data[i].point , changeDate:  new Date(res.data.data[i].changeDate).toLocaleDateString()   });
                  }
                  // 비동기 작업 완료 후 실행할 로직
                  setHistory(newData);
                
            })
            .catch((err) => {
                console.log("푸인트id"+userId);
                console.log(err);
              });       
        };
        
        fetchData(); // 비동기 함수 호출
        console.log("하이");
        console.log(history);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);
      
    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };
    return (
        <div id='pointhistory'>
            {/* <h3 id='codetxt'>포인트 히스토리</h3>
            <div id='modalcom'>
                <div class="modal-body" >
                    
                    {history.map((item, index) => (
                        <div key={index}>
                            <p>포인트: {item.point}
                            날짜: {item.changeDate}</p>
                           
                        </div>
                    ))}
                    </div>

                
            </div>
            <button id='recombutton' onClick={closeModal}>확인</button>
                    */}
  <div className="modal-header">
        새발자 테스트 모달
    </div>
    
    <div className="modal-content">  
    {history.map((item, index) => (
                        <div key={index}>
                            <p>포인트: {item.point}
                            날짜: {item.changeDate}</p>
                           
                        </div>
                    ))}  
    </div>
    
    <div className="modal-footer">
        <button id='recombutton' onClick={closeModal}>확인</button>
    </div>
        </div> 
    );
}
export default ShowPointHistory;