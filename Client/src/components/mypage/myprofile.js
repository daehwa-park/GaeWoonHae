import './myprofile.css'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const Myprofilepage = () => {
  const useremoji = useSelector(state=> state.auth.user.emojiId) 
  const userpoint = useSelector(state=> state.auth.user.point) 
  const nickname = useSelector(state=> state.auth.user.nickname) 
  
  const todayKcal = calKcal();
  const totalKcal = 100;
  const dateKcal = 50;

  function calKcal(gameTypeId, count){
    // 박터트리기 일땐 5 칼로리
    // 1분에 9칼로리
    // 한개에 1.5칼로리..?
    var kcal = 0;
  
    if(gameTypeId===1){
        kcal =  1.5 * count;
    }
    if(gameTypeId===2){
        kcal =  2 * count;
    }
    if(gameTypeId===3){
        kcal =  3 * count;
    }
    return kcal;
  };

    //운동 종류에 따른 칼로리 계산
    // function calKcal(gameTypeId, count){
    //     // 박터트리기 일땐 5 칼로리
    //     // 1분에 9칼로리
    //     // 한개에 1.5칼로리..?
    //     var kcal = 0;
      
    //     if(gameTypeId===1){
    //         kcal =  1.5 * count;
    //     }
    //     if(gameTypeId===2){
    //         kcal =  2 * count;
    //     }
    //     if(gameTypeId===3){
    //         kcal =  3 * count;
    //     }
    //     return kcal;
    // };

    //     return kcal ;
        // try{
        //     const res = await kcalapi.get("/api/user/")
        // }
   // };



  return (
      <div className='mypage-body1'>
        <div className='mypageleft'>
          <div className='profile-img'>프로필 사진</div>
          <div className='nickname'>
              닉네임: <span>{nickname}</span>    
              <butto className='changebtn'>변경하기</butto>
  
          </div>
          <div className='setemoji'>
              기본이모지: <span>{useremoji}</span>    
              <butto className='changebtn'>변경하기</butto>
          </div>
          <div className='savepoint'>
              보유 포인트: <span>{userpoint}c</span>    
          </div>
          <div className='secession'>탈퇴하기</div>
        </div>
        <div className='mypageright'>
            <div className='chart-nick'>{nickname}님의 운동량 차트</div>
            <div className='helth-chart'></div>

            <div className='Calendar-tag'>Calendar</div>
            <div className='Calendar'>
                <div className='image1'>달력</div>

                <div className='image2'>
                    <div className='kcal'>오늘 소모 칼로리 : {todayKcal}</div>
                    <div className='kcal'>총 소모 칼로리 : {totalKcal}</div>
                    <div className='kcal'>선택기간 소모 칼로리 : {dateKcal}</div>
                </div>
            </div>
        </div>
    </div>

  )
}

export default Myprofilepage