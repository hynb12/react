import { Component, useState } from "react";
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
  let [따봉, 따봉변경] = useState([21, 32, 44]);
  let [modal, setModal] = useState(false);
  let [titleNum, setTitleNum] = useState(0);
  let [입력값, 입력값변경] = useState("");
  let [날짜, 날짜변경] = useState([
    new Date().toString(),
    new Date().toString(),
    new Date().toString(),
  ]);

  // [].map()
  // 1. array 자료 갯수만큼 함수안의 코드 실행해줌
  // 2. 함수의 파라미터는 array안에 있던 자료임
  // 3. retrun에 뭐 적으면 array로 담아줌
  [1, 2, 3].map(function (a) {
    return "1251221";
  });

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

  const openModal = (n) => {
    // 간단하게 setModal(!modal) 이래도 됩니다.
    // 느낌표 우측 자료를 반대로 바꿔줍니다.
    // !true는 출력해보면 false입니다.
    // !false는 출력해보면 true입니다.
    // setModal(!modal);
    if (titleNum == n && modal == true) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

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
      {/* <div className="list">
        <h4 onClick={openModal}>
          {글제목[0]}
          <span
            onClick={() => {
              따봉변경(따봉 + 1);
            }}
          >
            👍
          </span>
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
      </div> */}

      {글제목.map(function (a, i) {
        return (
          <div className="list" key={i}>
            <h4
              onClick={() => {
                openModal(i);
                setTitleNum(i);
              }}
            >
              {a}
              <span
                onClick={(e) => {
                  // 상위 html로 퍼지는 이벤트 버블링을 막고싶다면
                  e.stopPropagation();

                  //  state가 array자료일 경우 복사부터 하고
                  // 그거 수정하면 된다고 해서 그렇게 했습니다.
                  let copy = [...따봉];
                  copy[i] = copy[i] + 1;
                  따봉변경(copy);
                }}
              >
                👍
              </span>
              {따봉[i]}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  let copy = [...글제목];
                  // delete copy[i];
                  // let newArr = copy.filter((element) => element !== undefined);
                  // 글제목변경(newArr);
                  copy.splice(i, 1);
                  글제목변경(copy);

                  let copy2 = [...따봉];
                  copy2.splice(i, 1);
                  따봉변경(copy2);

                  let copy3 = [...날짜];
                  copy3.splice(i, 1);
                  날짜변경(copy3);
                }}
                style={{ float: "right" }}
              >
                삭제
              </button>
            </h4>

            <p>{날짜[i]}</p>
          </div>
        );
      })}

      <input
        onChange={(e) => {
          // (정보) state변경 함수는 늦게 처리됨
          입력값변경(e.target.value); // 늦게처리됨(전문용어로 비동기처리)
          console.log(입력값);
        }}
      ></input>
      <button
        onClick={() => {
          if (입력값 == "") {
            alert("글을 입력해 주세요");
          } else {
            let copy = [...글제목];
            copy.unshift(입력값);
            글제목변경(copy);

            let copy2 = [...따봉];
            copy2.unshift(0);
            따봉변경(copy2);

            let copy3 = [...날짜];
            copy3.unshift(new Date().toString());
            날짜변경(copy3);
          }
        }}
      >
        글발행
      </button>

      {modal == true ? (
        <Modal
          함수2={함수2}
          color="orange"
          글제목={글제목}
          titleNum={titleNum}
        ></Modal>
      ) : null}
      <Modal2 />
      <Modal3 addr="Seoul" />
    </div>
  );
}

// 유형1
function Modal(props) {
  return (
    // 컴포넌트 만드는법
    // 1. function 만들고
    // 2. return()안에 html담기
    // 3. <함수명></함수명> 쓰기

    // 어떤걸 컴포넌트로 만들면좋은가?
    // 1. 반복적인 html축약할 때
    // 2. 큰 페이지들
    // 3. 자주변경되는 것들

    // 컴포넌트의 단점 : state 가져다쓸 때 문제생김
    // (A함수에 있던 변수는, B함수에서 마음대로 가져다 쓸 수 없음)

    // (참고1) 의미없는 <div>대신 <></> 사용가능
    // (참고2) <함수명></함수명>, <함수명/> 둘다가능

    // [동적인 UI 만드는 step]
    // 1. html css로 미리 디자인 완성
    // 2. UI의 현재 상태를 state로 저장
    // 3. state에 따라 UI가 어떻게 보일지 작성
    <>
      <div className="modal" style={{ background: props.color }}>
        <h4>{props.글제목[props.titleNum]}</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button onClick={props.함수2}>글수정</button>
      </div>
    </>
    // 부모 > 자식 state 전송하는 법
    // 1. <자식컴포넌트 작명={states이름}
    // 2. props 파라미터 등록 후 props.작명 사용
  );
}

// 유형2
const Modal2 = () => {
  return (
    <div className="modal">
      <h4>제목2</h4>
    </div>
  );
};

// class 문법으로 컴포넌트 만드는 법
class Modal3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "kim",
      age: 20,
    };
  }
  render() {
    return (
      <div>
        {this.props.addr} 안녕 {this.state.age}
        <button
          onClick={() => {
            this.setState({
              age: 21,
            });
          }}
        >
          버튼
        </button>
      </div>
    );
  }
}

export default App;
