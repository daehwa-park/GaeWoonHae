import {Link} from 'react-router-dom'
import './MyPage.css'
import { useState } from 'react'
// import axios from "axios";
import emoji1 from '../../assets/emoji/emoji_1.png'
import emoji2 from '../../assets/emoji/emoji_2.png'
import emoji3 from '../../assets/emoji/emoji_3.png'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import NavBox from "../../components/Navigate/NavBox"
// import { useSelector, useDispatch} from "react-redux"  //Store에서 state값 가져오기
// import {updateA} from '../../redux/reducer/MyPageReducer'
// import { useEffect } from 'react'
// 마이페이지

const Mypage = () => {
    // const [checknum, setChecknum] = useState(0);
    // const [Page, setPage] = useState(localStorage.getItem('mypagenum'))
    const [Page, setPage] = useState(0)
    // useEffect(()=>{
    //     A=localStorage.getItem('mypagenum')
    // },[Page])

    const useremoji = useSelector(state=> state.auth.user.emojiId) 
    const userpoint = useSelector(state=> state.auth.user.point) 
    const nickname = useSelector(state=> state.auth.user.nickname) 
    
    const todayKcal = calKcal();
    const totalKcal = 100;
    const dateKcal = 50;
    const userId = useSelector(state => state.auth.user.userId)


    // function userKcal(userId){
    //     const gameTypeId =1;
    //     const count = 10;
    //      try{
    //         const res = await kcalapi.get("/api/user/")
    //     }
        
    //     calKcal(gameTypeId, count);

    // }
    //운동 종류에 따른 칼로리 계산
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

    //     return kcal ;
        // try{
        //     const res = await kcalapi.get("/api/user/")
        // }
   // };

    // const [pageNumber, setPageNumber] = useState(0);

    // const returnMyPage = () => {
    //   setPageNumber(0);
    //   console.log(userId,useremoji,userpoint,nickname)
    // };
    // const goEmojiPage = () => {
    //   setPageNumber(1);
    // };
  
    // const lobbyapi = axios.create({
    //     baseURL: process.env.REACT_APP_SPRING_URI,
    //     headers: { "cotent-type": "application/json" },
    //   })

    // const emojishop = async(dispatch) => {
    //     // dispatch(findRoomRequest());

    //     // 전체 이모지 정보
    //     try {
    //         const res = await lobbyapi.get("/api/emoji/store", 
    //         );
    //         console.log(res.data)
    //       } catch (error) {
    //         console.log(error, "요청실패");
    //     }

    //     // 유저 닉네임, 이모지 정보, 포인트
    //     try {
    //         const res = await lobbyapi.get("/api/user/userinfo/1", 
    //         );
    //         console.log(res.data)
    //         console.log("유저정보")
    //       } catch (error) {
    //         console.log(error, "요청실패");
    //     }
    // };


    const pagenum = 2

    return (
        <div className='mypages'>
            {/* 상단 네비바 */}
            <div className='mainnavber'><NavBox pagenum={pagenum} /></div>

            <div className='mypage-body'>
                {Page === 1 ? (
                    <div className='mypage-body2'>
                
                            <div className='emoji-shop'>
                                <div>이모지 상점</div>
                                <div>보유 포인트: <p>123124</p></div>
                            </div>
                            <div className='emoji-body'>
                                <div className='emoji-left'>
                                    <div className='emoji-video'>영상</div>
                                    <div>이모지id</div>
                                    <div>이모지가격</div>
                                </div>
                                <div className='emoji-right'>
                                    <img className='emoji-size' src={emoji1} alt=""/>
                                    <img className='emoji-size' src={emoji2} alt=""/>
                                    <img className='emoji-size' src={emoji3} alt=""/>
                                
                                </div>
                            </div>
                        <div className='select-button'>
                            <div>취소</div>
                            <div>구입</div>
                        </div>
                    </div>

            
                ) : (
                    <div className='mypage-body1'>
                        <div className='mypageleft'>
                            <div className='profile-img'>프로필 사진</div>
                            <div>
                                닉네임:
                                <p>{nickname}</p>    
                            </div>
                            <div>
                                기본이모지:
                                <p>{useremoji}</p>    
                            </div>
                            <div>
                                보유 포인트:
                                <p>{userpoint}</p>    
                            </div>
                        </div>
                        <div className='mypageright'>
                            <div>운동량 차트</div>
                            <div className='helth-chart'></div>
                            <div>Calendar</div>
                            <div className='Calendar'>
                                <div className='image1'>달력</div>
                                <div className='image2'>
                                    <div>오늘 소모 칼로리 : {todayKcal}</div>
                                    <div>총 소모 칼로리 : {totalKcal}</div>
                                    <div>선택기간 소모 칼로리 : {dateKcal}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
            
            {/* <h2>{A1} dd</h2>
            <button onClick={handleClick}>Update A1</button> */}
            <Link to='/main'><button>메인으로 돌아가기</button></Link>
            <button>회원탈퇴</button>

        </div>
    )
}

export default Mypage