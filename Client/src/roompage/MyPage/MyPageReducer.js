import { createSlice } from "@reduxjs/toolkit"

// mypage내의 Store 
export const mypagedata = createSlice({
    name: 'mypage',
    initialState: {   //  초기 state값
        A1 : '1번',
        B1 : '2번',
        C1 : '3번',
        D1 : '4번',
    },
    reducers: {       //   state 변경
        updateA(state,action) {
            state.A1 = action.payload;
        },
        updateB(state,action) {
            state.B1 = action.payload;
        },
        updateC(state,action) {
            state.C1 = action.payload;
        },
        updateD(state,action) {
            state.D1 = action.payload;
        },
    }
})

export const {  //  export const를 사용하여 외부 컴포넌트에 공개
    updateA,
    updateB,
    updateC,
    updateD,
} = mypagedata.actions

export default mypagedata.reducer