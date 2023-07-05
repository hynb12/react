import { useState } from "react";
import "./App.css";

function App() {
  // state 만드는 법
  // 1. import { useState }
  // 2. useState(보관할 자료)
  // 3. let [작명(state에 보관했던 자료 나옴), 작명(state 변경 도와주는 함수)]

  // Q. state 언제써아함?
  // A. 변동시 자동으로 html에 반영되게 만들고 싶으면 state 쓰셈
  let [글제목, 글제목변경] = useState([
    "남자 코트 추천",
    "강남 우동 맛집",
    "파이썬독학",
  ]);
  let [따봉, 따봉변경] = useState(0);

  function 함수() {
    따봉변경(따봉 + 1);
  }

  function 함수2() {
    // array, object 자료 다룰 때는 원본 데이터를 직접 조작하는 것 보다는
    // 기존값은 보존해주는 식으로 코드짜는게 좋은관습입니다.
    // (왜냐면 원본 막 바꿔버렸을 때 갑자기 원본이 필요해지면 어쩔 것임)
    // 그래서 let copy 같은 변수에다가 기존 array를 복사해놓고
    // 그걸 조작하는 식으로 코드짜면 조금 더 안전합니다.
    let copy = [...글제목];
    copy[0] = "여자 코트 추천";
    글제목변경(copy);

    // [state변경함수특징]
    // 기존state == 신규state의 경우 변경안해줌

    // [array/ojbect 특징]
    // array/object 담은 변수엔 화살표(주소)만 저장됨
  }

  function 함수3() {
    let copy = [...글제목];
    copy.sort();
    글제목변경(copy);
  }

  return (
    // JSX 문법 1. html에 class 넣을 땐 className

    // JSX 문법 2. 변수를 html에 꽂아넣을 때는 {중괄호}
    // 온갖 곳에 {} 중괄호를 열어서 변수들을 집어넣을 수 있습니다.
    // href, id, className, src 등 여러가지 html 속성들에도 가능합니다.
    // 위처럼 쓰면 <div className="red"> 이렇게 되겠군요.
    // 참고로 변수에 있던걸 html에 꽂아넣는 작업을 있어보이는 말로 데이터바인딩이라고 합니다.

    // JSX 문법 3. html에 style속성 넣고싶으면
    // { 속성명 : '속성값' } 이렇게 넣으면 됩니다.
    // 근데 font-size 처럼 속성명에 대쉬기호를 쓸 수 없습니다.
    // 대쉬기호 대신 모든 단어를 붙여써야합니다. 붙여쓸 땐 앞글자를 대문자로 치환해야합니다.

    <div className="App">
      <div className="black-nav">
        <h4 style={{ color: "red", fontSize: "16px" }}>ReactBlog</h4>
      </div>
      <button onClick={함수2}>🤣변경</button>
      <button onClick={함수3}>가나다순정렬</button>
      <div className="list">
        <h4>
          {글제목[0]}
          <span onClick={함수}>👍</span>
          {따봉}
        </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{글제목[1]}</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{글제목[2]}</h4>
        <p>2월 17일 발행</p>
      </div>
    </div>
  );
}

export default App;
