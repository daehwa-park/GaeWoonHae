
import "./ShowPointHistory.css"
import axios from "axios";
import{ useEffect, useState } from "react";
function ShowPointHistory({ setModalOpen, userId}) {

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
                    newData.push({ point: res.data.data[i].point , changeDate: res.data.data[i].changeDate  });
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
        
      },[]);
      
    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };
    return (
        <div id='Recommendmodals'>
            <h3 id='codetxt'>포인트 히스토리</h3>
                <div id='modalcom'>
                {history.map((item, index) => (
                        <div key={index}>
                            <p>포인트: {item.point}</p>
                            <p>변경 날짜: {item.changeDate}</p>
                     
                        </div>
                    ))}
                    
                    <p id='recombutton' onClick={closeModal}>확인</p>
                </div>
        </div>
    );
}
export default ShowPointHistory;