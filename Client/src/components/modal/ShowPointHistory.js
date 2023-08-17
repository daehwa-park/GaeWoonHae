
import "./ShowPointHistory.css"
import axios from "axios";
import{ useEffect, useState } from "react";
import { authenticateAction } from "../../features/Actions/authenticateAction";

function ShowPointHistory({ setModalOpen, userId}) {
    
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
    // 오류 방지용 콘솔
    console.log(formatDate)
    const [history, setHistory] = useState([]);
    const recordApi = axios.create({
        baseURL: process.env.REACT_APP_SPRING_URI,
        headers: { "cotent-type": "application/json" },
      });

    recordApi.interceptors.request.use(
      (config) => {
        const accessToken = window.localStorage.getItem('accessToken');
        config.headers['token'] = accessToken;
  
        return config;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    )
  
  
    recordApi.interceptors.response.use(
      (response) => {
        if (response.status === 404) {
          console.log('404 페이지로 넘어가야 함!');
        }
  
        return response;
      },
      async (error) => {
        if (error.response.status === 401) {
  
          if (error.response.data.code === "E004") {
            window.location.href = `${process.env.REACT_APP_CLIENT_URI}`;
            return;
          }
  
          if (error.response.data.code === "E003") {
            await authenticateAction.refreshToken();
  
            const accessToken = window.localStorage.getItem("accessToken");
  
            error.config.headers = {
              'Content-Type': 'application/json',
              'token': accessToken,
            };
            
            // 중단된 요청을(에러난 요청)을 토큰 갱신 후 재요청
            const response = await axios.request(error.config);
            return response;
          }
        }
        return Promise.reject(error);
      }
    );

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
        <div className="historymodal-container">
          <div id='pointhistory'>
              <br/>
              <h3>포인트 히스토리</h3>
              <div>
                <div className="modal-content">
                  <table >
                    <thead>
                      <tr>
                        <th>번호</th>
                        <th>포인트</th>
                        <th>변경 날짜</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                {item.point >= 0 ? "+" : ""}
                                {item.point}
                                <img src="/images/img/coin.png" alt="My Image" width="18" />
                              </td>
                              <td>{item.changeDate}</td>
                            </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="modal-footer">
                  <button id='historybutton' onClick={closeModal}>확인</button>
              </div>
            </div> 
        </div>
    );
}
export default ShowPointHistory;