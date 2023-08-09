// 마이페이지 컴포넌트

import './myprofile.css'
import './calendarstyle.css'
import axios from "axios";
import React, { useEffect, useState } from "react";
// import React, { useEffect, useState, useRef } from "react";
import { useSelector } from 'react-redux/es/hooks/useSelector'
import ChangeNick from '../../components/modal/ChangeNickname'
import ChangeEmo from '../../components/modal/ChangeEmoji'
import { authenticateAction } from "../../features/Actions/authenticateAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import emoji1 from '../../assets/emoji/emoji1.png'
import emoji2 from '../../assets/emoji/emoji2.png'
import emoji3 from '../../assets/emoji/emoji3.png'

//달력
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import moment from 'moment';

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

  const [data, setData] = useState([]);

  // 달력에서 날짜가 선택될 때 호출되는 이벤트 핸들러
  // const onCalendarChange = (value) => {

  //   setSelectedDate(value); // 선택된 날짜를 상태에 반영

  //   getDateGameHistory( formatDate(selectedDate) );

  //   console.log('선택된 날짜:', formatDate(selectedDate));
  // };
  const onCalendarChange = async (value) => {
    setSelectedDate(value); // 선택된 날짜를 상태에 반영
  
    await getDateGameHistory(formatDate(value)); // 업데이트된 값으로 비동기 작업 수행
  
    console.log('선택된 날짜:', formatDate(value)); // 업데이트된 값 사용
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
      date: selectedDate
    };
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

  async function getDateRecord(thisDate) {
    const date = {
      date: formatDate(thisDate)
    };
  
    try {
      const response = await kcalApi.post("/api/record/date/" + userId, date);
  
      var calculatedKcal = 0;
      for (var i = 0; i < response.data.data.length; i++) {
        const count = response.data.data[i].count;
        const gameTypeId = response.data.data[i].gameTypeId;
        calculatedKcal += calKcal(gameTypeId, count);
      }
  
      return calculatedKcal;
    } catch (err) {
      console.log("선택 날짜 오류 id" + userId);
      console.log(err);
    }
  }
  

  useEffect(()=>{
    console.log("게임 히스토리 함수 실행");
    getTodayGameHistory();
    getTotalGameHistory();

    var now = new Date();	// 현재 날짜 및 시간
    var beforeWeek = new Date(now.setDate( now.getDate() -7 ));	//7일 전
    const newData = [];

    const fetchData = async () => {
      for (var i = 0; i < 7; i++) {
        var day = new Date(beforeWeek.setDate(beforeWeek.getDate() + 1));
        const dayKcal = await getDateRecord(day);
    
        console.log("칼로리 소모");
        console.log(dayKcal);
        newData.push({ name: formatDate(day), kcal: dayKcal });
      }
      // 비동기 작업 완료 후 실행할 로직
      setData(newData);
    };
    
    fetchData(); // 비동기 함수 호출
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // 회원 탈퇴 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const withdrawal=()=> {
    console.log('이동')
    dispatch(authenticateAction.userLogout(userId));
    navigate("/")
  }

  // 달력 데이터 
  // const [mark, setMark] = useState([]);
  // const { data } = useQuery(
  //   ["logDate", month],
  //   async () => {
  //     const result = await axios.get(
  //       `/api/healthLogs?health_log_type=DIET`
  //     );
  //     return result.data;
  //   },
  //   {
  //     onSuccess: (data: any) => {
  //       setMark(data);
  //      // ["2022-02-02", "2022-02-02", "2022-02-10"] 형태로 가져옴
  //     },
  //   }
  // );
  return (
      <div className='mypage-body1'>
        {LobbymodalOpen1 && <ChangeNick  setModalOpen={setLobbyModalOpen1} userId={userId} />}    
        {LobbymodalOpen2 && <ChangeEmo  setModalOpen={setLobbyModalOpen2} />}    
        <div className='mypageleft'>
          <div className='profile-img'>
            <img className='main-emoji' onClick={()=>showLobbyModal2()} src={getEmoji(useremoji)}  alt=""/>
     
          </div>
          
          <div className='nickname'>
              닉네임 : <span className='nickname2'>{nickname}</span>  <br/>  
              <button className='changebtn' onClick={()=>showLobbyModal1()}>변경하기</button>
          </div>

          {/* <div className='setemoji'>
              기본이모지 : 
              <button className='changebtn' onClick={()=>showLobbyModal2()}>변경하기</button>
          </div> */}

   
          <div className='savepoint'>
              보유 포인트 : <span className='points'>{userpoint}c</span>    
          </div>

          <div className='leavesecession' onClick={()=>withdrawal()} >탈퇴하기</div>
        </div>

        <div className='mypageright'>
          
            <div className='chart-nick'><span className='nametag'>{nickname}</span>님의 주간 운동량 차트</div>
            <div className='helth-chart'>
              <Rechart data={data}/>
            </div>

             <div className='chart-nick'><span className='nametag'>{nickname}</span>님의 운동기록</div>
            <div className='Calendar'>
                <div className='image2'>
                    {/* 달력 */}
                    <Calendar 
                    onChange={onCalendarChange} 
                    value={value} 
                    // selectRange={true} 
                    formatDay={(locale, date) => moment(date).format("DD")} 
                    /> 
                    {/* <Calendar
                      onChange={onCalendarChange} // useState로 포커스 변경 시 현재 날짜 받아오기
                      formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
                      value={value}
                      minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                      maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                      navigationLabel={null}
                      showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
                      className="mx-auto w-full text-sm border-b"
                      tileContent={({ date, view }) => { // 날짜 타일에 컨텐츠 추가하기 (html 태그)
                        // 추가할 html 태그를 변수 초기화
                        let html = [];
                        // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
                        if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                          html.push(<div className="dot"></div>);
                        }
                        // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
                        return (
                          <>
                            <div className="flex justify-center items-center absoluteDiv">
                              {html}
                            </div>
                          </>
                        );
                      }}
                    /> */}
                </div>

                <div className='image3'>
                    <div className='kcal'>오늘 소모 칼로리 : {todayKcal} Kcal</div>
                    <div className='kcal'>총 소모 칼로리 : {totalKcal} Kcal</div>
                    
                    <div className='kcal'> 선택 날짜:
                        {formatDate(selectedDate)}</div>
                    <div className='kcal'> {dateKcal} Kcal</div>
                   
                    {/* <div>
                        <div className="text-gray-500 mt-4">
                          선택 날짜:
                        {formatDate(selectedDate)}
                        </div>
                        <div className='kcal'>
                          {dateKcal} Kcal</div>

                    </div> */}
                </div>
            </div>
        </div>
    </div>

  )
  
}

export default Myprofilepage
