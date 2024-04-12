import { configureStore, createSlice } from "@reduxjs/toolkit";
import { cart } from "./store/cartSlice";

// Redux store에 state 보관하는 법
// 저번시간에 만들어둔 store.js 파일 열어서 이렇게 코드짜면 state 하나 만들 수 있습니다.
// step 1. createSlice( ) 로 state 만들고
// step 2. configureStore( ) 안에 등록하면 됩니다.
//
// 1. createSlice( ) 상단에서 import 해온 다음에
// { name : 'state이름', initialState : 'state값' } 이거 넣으면 state 하나 생성가능합니다.
// (createSlice( ) 는 useState( ) 와 용도가 비슷하다고 보면 됩니다)
// 2. state 등록은 configureStore( ) 안에 하면 됩니다.
// { 작명 : createSlice만든거.reducer } 이러면 등록 끝입니다.
// 여기 등록한 state는 모든 컴포넌트가 자유롭게 사용가능합니다.

let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },

  // Redux  : store의 state 변경하는 법
  // 1. store.js 안에 state 수정해주는 함수부터 만듭니다.
  // 2. 다른 곳에서 쓰기좋게 export 해둡니다.
  // 3. 원할 때 import 해서 사용합니다. 근데 dispatch() 로 감싸서 써야함
  reducers: {
    basicChangeName(state) {
      return "john " + state;
    },
    changeName(
      state // 기존 state를 뜻함
    ) {
      state.name = "park";
      // 근데 state를 직접 수정하라고해도 변경 잘 됩니다.
      // state를 직접 수정하는 문법을 사용해도 잘 변경되는 이유는
      // Immer.js 라이브러리가 state 사본을 하나 더 생성해준 덕분인데 Redux 설치하면 딸려와서 그렇습니다.

      // 그래서 결론은 array/object 자료의 경우 state변경은
      // state를 직접 수정해버려도 잘 되니까 직접 수정하십시오.

      // (참고) 그래서 state 만들 때 문자나 숫자하나만 필요해도
      // redux에선 일부러 object 아니면 array에 담는 경우도 있습니다.
      // 수정이 편리해지니까요.
    },
    increaseAge(state, action) {
      state.age += action.payload;
      // (참고)
      // action 이런 식으로 작명 많이 합니다.
      // action.type 하면 state변경함수 이름이 나오고
      // action.payload 하면 파라미터가 나옵니다.
    },
  },
});

export let { basicChangeName, changeName, increaseAge } = user.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
  },
});
