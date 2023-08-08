// 마이페이지 컴포넌트

import './myprofile.css'
import axios from "axios";
import React, { useEffect, useState } from "react";
// import React, { useEffect, useState, useRef } from "react";
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
import Rechart from "./recordChart";



const Myprofilepage = () => {
  // 유저 이모지Id
  const useremoji = useSelector(state=> state.auth.user.emojiId) 
  // 유저 포인트
  const userpoint = useSelector(state=> state.auth.user.point) 
  // 유저 닉네임
  const nickname = useSelector(state=> state.auth.user.nickname)
  // 유저 Id
  const userId = useSelector(state=> state.auth.user.userId)


  // 칼로리
  const [todayKcal, setTodayKcal] = useState(0); // useState를 이용하여 상태로 관리
  const [totalKcal, setTotalKcal] = useState(0); // useState를 이용하여 상태로 관리
  const [dateKcal, setDateKcal] = useState(0); // useState를 이용하여 상태로 관리
  const [selectKcal, setSelectedKcal] = useState(0); // useState를 이용하여 상태로 관리

  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜를 상태로 관리

 

  // 달력에서 날짜가 선택될 때 호출되는 이벤트 핸들러
  const onCalendarChange = (selectedDate) => {
    setSelectedDate(selectedDate); // 선택된 날짜를 상태에 반영

    getDateGameHistory(  formatDate(selectedDate));

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
          }

          setTodayKcal(calculatedKcal); // 상태 업데이트
            
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
            }

            setTotalKcal(calculatedKcal); // 상태 업데이트
            
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

  // function getDateRecord(thisDate){
  //   const date ={
  //     date: formatDate(thisDate)
  //   }
  //   kcalApi
  //       .post("/api/record/date/"+userId, date)
  //       .then((res)=>{
  //         console.log("선택 기간 운동")
  //         console.log(res)
  //         var calculatedKcal =0;
  //           for(var i=0 ; i<res.data.data.length; i++){
  //               const count = res.data.data[i].count;
  //               const gameTypeId = res.data.data[i].gameTypeId;  
  //               calculatedKcal += calKcal(gameTypeId, count);
  //           }
  //                 setSelectedKcal(calculatedKcal);
                  
  //       })
  //       .catch((err) => {
  //          console.log("선택 날짜 오류id"+userId);
  //          console.log(err);
  //         }); 
  // }


  useEffect(()=>{
    console.log("게임 히스토리 함수 실행");
    getTodayGameHistory();
    getTotalGameHistory();

    // var now = new Date();	// 현재 날짜 및 시간
    
    // console.log("현재 : ", formatDate(now));
    // var yesterday = new Date(now.setDate(now.getDate() - 1));	// 어제
    // console.log("어제 : ", formatDate(yesterday));

    // for(var i=0;i<7;i++){
    //   //getDateRecord(formatDate(yesterday));
    //   // console(formatDate(yesterday));
    //   //data.push({ name: formatDate(yesterday), kcal: selectKcal });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    
    var now = new Date();	// 현재 날짜 및 시간
    for(var i=0;i<7;i++){
      var day = new Date(now.setDate(now.getDate() - i));	// 어제
      data.push({ name: formatDate(day), kcal: 1398 });

    }
  },[]);


  // 모달창 관리
  const [LobbymodalOpen1, setLobbyModalOpen1] = useState(false);
  const [LobbymodalOpen2, setLobbyModalOpen2] = useState(false);

  const showLobbyModal1 = () => {
    setLobbyModalOpen1(true);
  };
  const showLobbyModal2 = () => {
    setLobbyModalOpen2(true);
  };
  
  // 이모지 선택 관리
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
            <img className='main-emoji' onClick={()=>showLobbyModal2()} src={getEmoji(useremoji)}  alt=""/>
     
          </div>
          
          <div className='nickname'>
              닉네임: <span>{nickname}</span>  <br/>  
              <button className='changebtn' onClick={()=>showLobbyModal1()}>변경하기</button>
          </div>

          <div className='setemoji'>
              기본이모지: 
              {/* <span>{useremoji}</span>     */}
              <button className='changebtn' onClick={()=>showLobbyModal2()}>변경하기</button>
          </div>

   
          <div className='savepoint'>
              보유 포인트: <span className='points'>{userpoint}c</span>    
          </div>
          <div className='leavesecession' >탈퇴하기</div>
          {/* 제거 예정 */}
          {/* <div onclick={getDateRecord()}>{selectKcal}</div>    */}
        </div>
        <div className='mypageright'>
            <div className='chart-nick'>{nickname}님의 주간 운동량 차트</div>
            <div className='helth-chart'>
            <Rechart/>
            </div>

            
            <div className='Calendar'>
                <div className='image2'>
                    {/* 달력 */}
                    <Calendar onChange={onCalendarChange} value={value} />         
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

//const data=[];


const data = [
    // {
    //     name: "월",
    //     kcal: 2400,
    // },
  ];
export const getData = () => {
  return data;
};

export default Myprofilepage
