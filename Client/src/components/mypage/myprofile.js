import './myprofile.css'
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from 'react-redux/es/hooks/useSelector'
import ChangeNick from '../../components/modal/ChangeNickname'
import ChangeEmo from '../../components/modal/ChangeEmoji'
// import moment from "moment";
import emoji1 from '../../assets/emoji/emoji_1.png'
import emoji2 from '../../assets/emoji/emoji_2.png'
import emoji3 from '../../assets/emoji/emoji_3.png'


//달력
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import

//차트
import LineChart from '../mypage/recordChart';

// import {
//   Chart,
//   LineController,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
// } from "chart.js";


const Myprofilepage = () => {
  // store에서 유저Id,닉네임, 보유포인트, 이모지id 가져오기
  const useremoji = useSelector(state=> state.auth.user.emojiId) 
  const userpoint = useSelector(state=> state.auth.user.point) 
  const nickname = useSelector(state=> state.auth.user.nickname)
  const userId = useSelector(state=> state.auth.user.userId)


  //var todayKcal = 0;
  // var dateKcal = 0;
  const [todayKcal, setTodayKcal] = useState(0); // useState를 이용하여 상태로 관리
  const [totalKcal, setTotalKcal] = useState(0); // useState를 이용하여 상태로 관리
  const [dateKcal, setDateKcal] = useState(0); // useState를 이용하여 상태로 관리

  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜를 상태로 관리


  // 달력에서 날짜가 선택될 때 호출되는 이벤트 핸들러
  const onCalendarChange = (selectedDate) => {
    setSelectedDate(selectedDate); // 선택된 날짜를 상태에 반영

    getDateGameHistory(selectedDate);

    console.log('선택된 날짜:', formatDate(selectedDate));
  };

 // const [value, onChange] = useState(new Date());
  const value = new Date();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  
  function calKcal(gameTypeId, count){
    // 박터트리기 : 1개당 1칼로리
    // 픽토그램 : 1 개당 0.5 칼로리
    // 공피하기 : 1개당 2칼로리 
    var typeKcal = 0;
  
    if(gameTypeId===1){
        typeKcal = 1;
    }
    if(gameTypeId===2){
        typeKcal = 0.5;
    }
    if(gameTypeId===3){
        typeKcal = 2;
    }
    return typeKcal * count;
  };

  const kcalApi = axios.create({
    baseURL: process.env.REACT_APP_SPRING_URI,
    headers: { "cotent-type": "application/json" },
  });
  
  function getTodayGameHistory(){
    kcalApi
        .get("/api/record/today/"+userId)
        .then((res)=>{

            console.log("오늘 기록")
            console.log(res)

            var calculatedKcal =0;
            
            for(var i=0 ; i<res.data.data.length; i++){
              const count = res.data.data[i].count;
              const gameTypeId = res.data.data[i].gameTypeId;  
              calculatedKcal += calKcal(gameTypeId, count);
              //console.log("계산식")
              //console.log(calculatedKcal)
          }
          //totalKcal = temp;
          setTodayKcal(calculatedKcal); // 상태 업데이트

          //console.log("총운동: "+ temp);
            // const count =res.data.data[0].count;
            // const gameTypeId = res.data.data[0].gameTypeId;

            // const calculatedKcal = calKcal(gameTypeId, count);
            // setTodayKcal(calculatedKcal); // 상태 업데이트

            
        })
        .catch((err) => {
            console.log("기록 오류id"+userId);
            console.log(err);
          });       
  }
  function getTotalGameHistory(){
    kcalApi
        .get("/api/record/"+userId)
        .then((res)=>{
          console.log("총 운동")
          console.log(res)
            var calculatedKcal =0;

            for(var i=0 ; i<res.data.data.length; i++){
                const count = res.data.data[i].count;
                const gameTypeId = res.data.data[i].gameTypeId;  
                calculatedKcal += calKcal(gameTypeId, count);
                //console.log("계산식")
                //console.log(calculatedKcal)
            }
            //totalKcal = temp;
            setTotalKcal(calculatedKcal); // 상태 업데이트
            //console.log("총운동: "+ temp);
            
        })
        .catch((err) => {
           // console.log("기록 오류id"+userId);
           // console.log(err);
          });       
  }
  function getDateGameHistory(selectedDate){
    const date ={
      date: formatDate(selectedDate)
    }
    kcalApi
        .post("/api/record/date/"+userId, date)
        .then((res)=>{
          console.log("선택 기간 운동")
          console.log(res)
          var calculatedKcal =0;
            for(var i=0 ; i<res.data.data.length; i++){
                const count = res.data.data[i].count;
                const gameTypeId = res.data.data[i].gameTypeId;  
                calculatedKcal += calKcal(gameTypeId, count);
            }
            setDateKcal(calculatedKcal); // 상태 업데이트
        })
        .catch((err) => {
           console.log("선택 날짜 오류id"+userId);
           console.log(err);
          }); 
  }


  useEffect(()=>{
    console.log("게임 히스토리 함수 실행");
    getTodayGameHistory();
    getTotalGameHistory();

    var now = new Date();	// 현재 날짜 및 시간
    console.log("현재 : ", formatDate(now));
    var yesterday = new Date(now.setDate(now.getDate() - 1));	// 어제
    console.log("어제 : ", formatDate(yesterday));

  },[]);

  const [LobbymodalOpen1, setLobbyModalOpen1] = useState(false);
  const [LobbymodalOpen2, setLobbyModalOpen2] = useState(false);

  const showLobbyModal1 = () => {
    setLobbyModalOpen1(true);
  };
  const showLobbyModal2 = () => {
    setLobbyModalOpen2(true);
  };
  const getEmoji = (emojiId) => {
    switch (emojiId) {
        case 1:
          return emoji1;
        case 2:
          return emoji2;
        case 3:
          return emoji3;
        default:
          return ""; 
      }
    };









  return (
      <div className='mypage-body1'>
        {LobbymodalOpen1 && <ChangeNick  setModalOpen={setLobbyModalOpen1} userId={userId} />}    
        {LobbymodalOpen2 && <ChangeEmo  setModalOpen={setLobbyModalOpen2} />}    
        <div className='mypageleft'>
          <div className='profile-img'>
          <img className='emoji-size' src={getEmoji(useremoji)}  alt=""/>
     
          </div>

          <div className='setemoji'>
              기본이모지: <span>{useremoji}</span>    
              <button className='changebtn' onClick={()=>showLobbyModal2()}>변경하기</button>
          </div>

          <div className='nickname'>
              닉네임: <span>{nickname}</span>    
              <button className='changebtn' onClick={()=>showLobbyModal1()}>변경하기</button>
  
          </div>
   
          <div className='savepoint'>
              보유 포인트: <span>{userpoint}c</span>    
          </div>
          <div className='secession'>탈퇴하기</div>
        </div>
        <div className='mypageright'>
            <div className='chart-nick'>{nickname}님의 주간 운동량 차트</div>
            <div className='helth-chart'>
            {/* <LineChart /> */}
            </div>

            
            <div className='Calendar'>
                <div className='image2'>
                    {/* 달력 */}
                    <Calendar style={{ height:"20vh"}} onChange={onCalendarChange} value={value} />         
                </div>

                <div className='image2'>
                    <div className='kcal'>오늘 소모 칼로리 : {todayKcal} Kcal</div>
                    <div className='kcal'>총 소모 칼로리 : {totalKcal} Kcal</div>
                    <div>
                        <div className="text-gray-500 mt-4">
                          선택 날짜:
                        {formatDate(selectedDate)}
                        </div>
                        <div className='kcal'>
                          {dateKcal} Kcal</div>

                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}

export default Myprofilepage