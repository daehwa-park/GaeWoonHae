// 마이 페이지에서 이모지 정보를 수정, 관리

// Api요청 =>  이모지상점 데이터 가져오기,     이모지 구매 요청,     사용자가 적용한 이모지Id 갱신
//                (emojiShopdata)               (emojiBuy)              (applyEmoji)

import axios from "axios";
import { emojiActions } from "../../redux/reducer/emojishopReducer";
import {authActions} from "../../redux/reducer/authenticateReducer"

const emojiapi = axios.create({
  baseURL: process.env.REACT_APP_SPRING_URI,
  headers: { "cotent-type": "application/json" },
})

// 이모지 상점 데이터 가져오기
function emojiShopdata() {
  return async (dispatch, getState) => {
  // 전체 이모지 정보
    await emojiapi
    .get("/api/emoji/store", {
    })
    .then((res) => {
      // 받아온 정보 => 리덕스에 저장
      const emojidata = res.data.data;
      const emojiId = [];
      const emojiPoint = [];
      for (let i=0 ; i <emojidata.length; i++) {
        emojiId.push(emojidata[i].emojiId)
        emojiPoint.push(emojidata[i].emojiPrice)
      }
      console.log(emojiPoint,'포인트')
      // console.log(emojiId,emojiprice)
      dispatch(emojiActions.emojishopdata({ emojiId,emojiPoint })); // 리덕스파일에 함수,변수 생성해 저장
      console.log(res);
    })

    .catch((err) => {
      console.log(err);
    });
  }
};

// 이모지 구매 요청
function emojiBuy(userPoint, userId , selectEmojiId) {

  return async (dispatch, getState) => {
    const Buydata = {
      userId : userId,  
      // userId : 1,  //더미데이터
      emojiId : selectEmojiId,
    }
  // 전체 이모지 정보
    await emojiapi
    .post("/api/emoji/store/buy", 
      Buydata
    )
    .then((res) => {
      // 받아온 정보 => 리덕스에 저장
      console.log('구매성공')
      let mypoint = res.data.data.point
      const getemoji = res.data.data.emojiId;
      if (mypoint <= 0) {
        mypoint =0
      }
      // const userPoint = userPoint;
      console.log(mypoint, getemoji);
      
      dispatch(authActions.emojiBuy({ mypoint, getemoji })); // 리덕스파일에 함수,변수 생성해 저장
    })

    .catch((err) => {
      console.log('구매 오류발생',userId , selectEmojiId)
      console.log(err);
    });
  }
};

// 사용자가 적용한 이모지Id 갱신
function applyEmoji(userId , emojiId) {

  return async (dispatch, getState) => {
    const data = {
      userId : userId,  
      emojiId : emojiId,
    }
  // 전체 이모지 정보
    await emojiapi
    .post("/api/emoji/change", 
      data
    )
    .then((res) => {
      // 받아온 정보 => 리덕스에 저장
      console.log('이모지적용 성공')   
      dispatch(authActions.applyEmoji({ emojiId })); // 리덕스파일에 함수,변수 생성해 저장
    })

    .catch((err) => {
      console.log('이모지 적용 오류발생')
      console.log(err);
    });
  }
};

// function getEmoji(requestdata) {
//   return async (dispatch, getState) => {

//     await emojiapi
//       .post("/api/", {
//         requestdata,
//       })
//       .then((res) => {
//         // 받아온 정보 => 리덕스에 저장
//         const tokens = res.data.data.tokens;
//         const userId = res.data.data.userId;
//         dispatch(authActions.getTokensUserId({ tokens, userId })); // 리덕스파일에 함수,변수 생성해 저장
//         console.log(res);
//       })

//       .catch((err) => {
//         console.log(err);
//       });
//   };
// }


export const emojiShopAction = { emojiShopdata,emojiBuy,applyEmoji };
