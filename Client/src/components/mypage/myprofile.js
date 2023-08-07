import './myprofile.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux/es/hooks/useSelector'
import ChangeNick from '../../components/modal/ChangeNickname'
import ChangeEmo from '../../components/modal/ChangeEmoji'


const Myprofilepage = () => {
  const useremoji = useSelector(state=> state.auth.user.emojiId) 
  const userpoint = useSelector(state=> state.auth.user.point) 
  const nickname = useSelector(state=> state.auth.user.nickname)
  const userId = useSelector(state=> state.auth.user.userId)

  
  //var todayKcal = 0;
  var dateKcal = 0;
  const [todayKcal, setTodayKcal] = useState(0); // useState를 이용하여 상태로 관리
  const [totalKcal, setTotalKcal] = useState(0); // useState를 이용하여 상태로 관리

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
        .get("/api/record/today/"+1)
        .then((res)=>{
            //console.log(res)
            //console.log( res.data.data[0].count);
            console.log("확잉")
            console.log(userId)
            console.log(useremoji)
            console.log(nickname)
            console.log("확잉")

          
            const count =res.data.data[0].count;
            const gameTypeId = res.data.data[0].gameTypeId;

            const calculatedKcal = calKcal(gameTypeId, count);
            setTodayKcal(calculatedKcal); // 상태 업데이트
            //console.log(calculatedKcal)
            //console.log(res.data.data[0].count)
            
        })
        .catch((err) => {
            console.log("기록 오류id"+userId);
            console.log(err);
          });       
  }
  function getTotalGameHistory(){
    kcalApi
        .get("/api/record/"+1)
        .then((res)=>{
            var calculatedKcal =0;

            for(var i=0 ; i<res.data.data.length; i++){
                const count = res.data.data[i].count;
                const gameTypeId = res.data.data[i].gameTypeId;  
                calculatedKcal += calKcal(gameTypeId, count);
                console.log("계산식")
                console.log(calculatedKcal)
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
  // function changeNickname(){

  // }
  // function changeMainEmoji(){
    
  // }
  useEffect(()=>{
    console.log("게임 히스토리 함수 실행");
    getTodayGameHistory();
    getTotalGameHistory();
    console.log("닉넴")
  
    console.log(nickname)
  },[]);

  const [LobbymodalOpen1, setLobbyModalOpen1] = useState(false);
  const [LobbymodalOpen2, setLobbyModalOpen2] = useState(false);

  const showLobbyModal1 = () => {
    setLobbyModalOpen1(true);
  };
  const showLobbyModal2 = () => {
    setLobbyModalOpen2(true);
  };
  

  return (
      <div className='mypage-body1'>
        {LobbymodalOpen1 && <ChangeNick  setModalOpen={setLobbyModalOpen1} />}    
        {LobbymodalOpen2 && <ChangeEmo  setModalOpen={setLobbyModalOpen2} />}    
        <div className='mypageleft'>
          <div className='profile-img'>프로필 사진</div>
          <div className='nickname'>
              닉네임: <span>{nickname}</span>    
              <button className='changebtn' onClick={()=>showLobbyModal1()}>변경하기</button>
  
          </div>
          <div className='setemoji'>
              기본이모지: <span>{useremoji}</span>    
              <button className='changebtn' onClick={()=>showLobbyModal2()}>변경하기</button>
          </div>
          <div className='savepoint'>
              보유 포인트: <span>{userpoint}c</span>    
          </div>
          <div className='secession'>탈퇴하기</div>
        </div>
        <div className='mypageright'>
            <div className='chart-nick'>{nickname}님의 주간 운동량 차트</div>
            <div className='helth-chart'></div>

            <div className='Calendar-tag'>Calendar</div>
            <div className='Calendar'>
                {/* <div className='image1'>달력</div> */}
                <div className='image2'>
                    달력

                    </div>


                <div className='image2'>
                    <div className='kcal'>오늘 소모 칼로리 : {todayKcal} Kcal</div>
                    <div className='kcal'>총 소모 칼로리 : {totalKcal} Kcal</div>
                    <div className='kcal'>선택된 날짜 소모 칼로리 : {dateKcal} Kcal</div>
                </div>
            </div>
        </div>
    </div>

  )
}

export default Myprofilepage