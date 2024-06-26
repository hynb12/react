import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import bg from "./img/bg.png";
import Row from "react-bootstrap/Row";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  lazy,
  Suspense,
  memo,
  useMemo,
  useTransition,
  useDeferredValue,
} from "react";
import data from "./data.js";
import {
  Route,
  Routes,
  useNavigate,
  Outlet,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, increaseAge } from "./store.js";
import { addCart } from "./store/cartSlice.js";
import { useQuery } from "react-query";

// import EventPage from "./routes/EventPage.js";
const EventPage = lazy(() => import("./routes/EventPage.js"));
// lazy import
// 리액트 코드 다 짰으면 npm run build 입력해서
// 여러분이 짰던 이상한 코드들을 역사와 전통의 html css js 파일로 변환해야합니다.
// 근데 리액트로 만드는 Single Page Application의 특징은 html, js 파일이 하나만 생성됩니다.
// 그 안에 지금까지 만든 App / Detail / Cart 모든 내용이 들어있어서 파일사이즈가 좀 큽니다.
// 원래 그래서 리액트 사이트들은 첫 페이지 로딩속도가 매우 느릴 수 있습니다.
// 그게 싫다면 js 파일을 잘게 쪼개면 됩니다.
// lazy 문법으로도 똑같이 import가 가능한데 이 경우엔
// "Detail 컴포넌트가 필요해지면 import 해주세요" 라는 뜻이 됩니다.
// 그리고 이렇게 해놓으면 Detail 컴포넌트 내용을 다른 js 파일로 쪼개줍니다.
// 그래서 첫 페이지 로딩속도를 향상시킬 수 있습니다.
//
// lazy 사용하면 당연히 Detail 컴포넌트 로드까지 지연시간이 발생할 수 있습니다. 그럴 땐
// 1. Suspense 라는거 import 해오고
// 2. Detail 컴포넌트를 감싸면
// Detail 컴포넌트가 로딩중일 때 대신 보여줄 html 작성도 가능합니다.
// 귀찮으면 <Suspense> 이걸로 <Routes> 전부 감싸도 됩니다.

export let Context1 = createContext(); // state 보관함

// 페이지나누는법(리엑트)
// 1. 컴포넌트 만들어서 상세페이지 내용 채움
// 2. 누가 /detail 접속하면 그 컴포넌트 보여줌
function App() {
  // localStorage에 array/object 자료를 저장하려면
  // 문자만 저장할 수 있는 공간이라 array/object를 바로 저장할 수는 없습니다.
  // 강제로 저장해보면 문자로 바꿔서 저장해주는데 그럼 array/object 자료가 깨져서 저장됩니다.
  // 그래서 편법이 하나 있는데 array/object -> JSON 이렇게 변환해서 저장하면 됩니다.
  // JSON은 문자취급을 받아서 그렇습니다.
  // JSON은 그냥 따옴표친 array/object 자료입니다.
  // let obj = {name : 'kim'};
  // localStorage.setItem('data', JSON.stringify(obj));
  // let getData = localStorage.getItem('data')
  // console.log('getData:', JSON.parse(getData).name)

  let [shoes, setShoes] = useState(data);
  //  페이지 이동기능을 만들고 싶으면 useNavigate() 씁니다.
  let navigate = useNavigate();

  // Context API
  let [contextApiStock] = useState([
    "Context API 1",
    "Context API 2",
    "Context API 3",
  ]);
  // 1. 일단 createContext() 함수를 가져와서 context를 하나 만들어줍니다.
  // context를 쉽게 비유해서 설명하자면 state 보관함입니다.
  // 2. 아까만든 Context1로 원하는 곳을 감싸고 공유를 원하는 state를 value 안에 다 적으면 됩니다.
  // 그럼 이제 Context1로 감싼 모든 컴포넌트와 그 자식컴포넌트는
  // state를 props 전송없이 직접 사용가능합니다.
  //
  // ** Context 안에 있던 state 사용하려면
  // 1. 만들어둔 Context를 import 해옵니다.
  // 2. useContext() 안에 넣습니다.
  // 그럼 이제 그 자리에 공유했던 state가 전부 남는데 그거 쓰면 됩니다.
  //
  // ** Context API 단점
  // 실은 잘 안쓰는 이유는
  // 1. state 변경시 쓸데없는 컴포넌트까지 전부 재렌더링이 되고
  // 2. useContext() 를 쓰고 있는 컴포넌트는 나중에 다른 파일에서 재사용할 때 Context를 import 하는게 귀찮아질 수 있습니다.
  // 그래서 이것 보다는 redux 같은 외부라이브러리를 많이들 사용합니다.

  // React-Query
  // 장점1. ajax 요청 성공/실패/로딩중 상태를 쉽게 파악할 수 있습니다.
  // 장점2. 틈만나면 알아서 ajax 재요청해줍니다.
  // 장점3. 실패시 재시도 알아서 해줌
  // 장점4. ajax로 가져온 결과는 state 공유 필요없음
  // 장점5. ajax 결과 캐싱기능
  let result = useQuery(
    "userdata",
    () =>
      axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
        console.log("요청됨");
        return a.data;
      }),
    { staleTime: 2000 }
  );

  console.log("result : ", result);

  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand>ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                // navigate(-1); // 뒤로가기(-2하면 2번감)
                navigate("/");
              }}
            >
              Home
            </Nav.Link>

            <Nav.Link
              onClick={() => {
                navigate("/detail/1");
              }}
            >
              Detail
            </Nav.Link>

            <Nav.Link
              onClick={() => {
                navigate("/event");
              }}
            >
              Event
            </Nav.Link>

            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
            {/* <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/detail">detail</Nav.Link> */}
          </Nav>
          <Nav className="ms-auto">
            {result.isLoading && "로딩중"}
            {result.error && "에러남"}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>
      <div className="main-bg" style={{ backgroundImage: `url(${bg})` }}></div>
      {/* <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link> */}
      <Suspense fallback={<div>로딩중입니다</div>}>
        <Routes>
          <Route path="/" element={<MainPage shoes={shoes} />} />

          {/* url 파라미터 detail/:id */}
          <Route
            path="detail/:id"
            element={
              // Context API
              <Context1.Provider value={{ contextApiStock }}>
                <Detail shoes={shoes} />
              </Context1.Provider>
            }
          />

          <Route path="about" element={<About />}>
            {/* 
          <Route>안에 <Route>를 넣을 수 있는데 이걸 Nested routes 라고 부릅니다.
          /about/member 
          /about/location
          */}
            <Route path="member" element={<div>멤버임</div>} />
            <Route path="location" element={<About />} />
          </Route>

          <Route path="event" element={<EventPage />}>
            <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>} />
            <Route path="two" element={<p>생일기념 쿠폰받기</p>} />
          </Route>

          <Route path="/cart" element={<Cart />} />

          {/* 404페이지는 */}
          <Route path="*" element={<div>없는페이지에요</div>} />
        </Routes>
      </Suspense>
    </div>
  );
}

function MainPage({ shoes }) {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (shoes) {
      setList(shoes);
    }
  }, [shoes]);

  return (
    <>
      <Container>
        <Row>
          {list.map((a, i) => {
            return <Card product={a} key={i} />;
          })}
        </Row>
        {loading ? <div>loading</div> : null}
      </Container>
      <button
        style={{ visibility: page > 3 ? "hidden" : "none" }}
        onClick={() => {
          setLoading(true);
          axios
            .get(`https://codingapple1.github.io/shop/data` + page + `.json`)
            .then((res) => {
              console.log("res", res.data);
              setList([...list, ...res.data]);
              setPage(page + 1);
            })
            .catch((error) => {
              console.log("실패함 ㅅㄱ");
            })
            .finally((fin) => {
              setLoading(false);
            });

          // 동시에 AJAX 요청 여러개 날리려면
          // Promise.all([axios.get("URL1"), axios.get("URL2")]).then();

          // 원래 서버와 문자자료만 주고받을 수 있음 (JSON형태)

          // 쌩자바스크립트 문법인 fetch() 를 이용해도 GET/POST 요청이 가능한데
          // 그건 JSON -> object/array 이렇게 자동으로 안바꿔줘서 직접 바꾸는 작업이 필요합니다.
          // 마음에 들면 쓰도록 합시다.
          // fetch('URL').then(결과 => 결과.json()).then((결과) => { console.log(결과) } )

          // 자주묻는 질문 : ajax로 가져온 데이터를 html에 꽂을 때 왜 에러남?
          // 1. ajax요청으로 데이터를 가져와서
          // 2. state에 저장하라고 코드를 짜놨고
          // 3. state를 html에 넣어서 보여달라고 <div> {state.어쩌구} </div> 이렇게 코드 짰습니다.
          // 잘 될 것 같은데 이 상황에서 state가 텅 비어있다고 에러가 나는 경우가 많습니다.
          // 이유는 ajax 요청보다 html 렌더링이 더 빨라서 그럴 수 있습니다.
          // state안에 뭐가 들어있으면 보여달라고 if문 같은걸 추가하거나 그러면 됩니다.
        }}
      >
        더보기
      </button>
    </>
  );
}

// styled-components
// 장점1. CSS 파일 오픈할 필요없이 JS 파일에서 바로 스타일넣을 수 있습니다.
// 장점2. 여기 적은 스타일이 다른 JS 파일로 오염되지 않습니다. 원래 그냥 CSS파일은 오염됩니다.
// 장점3. 페이지 로딩시간 단축됩니다.
// 실은 일반 CSS 파일도 오염방지 가능 "컴포넌트명.module.css" 이렇게 CSS 파일을 작명하면 됩니다.
let ColorBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg === "blue" ? "white" : "black")};'
  padding: 10px;
`;

let Box = styled.div`
  background: grey;
  padding: 20px;
`;

function Detail(props) {
  // 유저가 URL파라미터에 입력한거 가져오려면
  let { id } = useParams();
  let item = props.shoes.find((e) => {
    if (e.id == id) return e;
  });
  // let 찾은상품 = props.shoes.find(function(x){
  //   return x.id == id
  // });

  // 밖에다 써도 작동하긴함
  let [outCount, setOutCount] = useState(77);
  console.log("안녕 outCount:" + outCount);

  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);
  let [tab, setTab] = useState(0);

  // useEffect 안에 적은 코드는 html 렌더링 이후에 동작합니다.
  // mount, update 할때 실행됨
  // 컴포넌트의 핵심 기능은 html 렌더링이라
  // 그거 외의 쓸데없는 기능들은 useEffect 안에 적으라는 소리입니다.
  // 오래걸리는 반복연산, 서버에서 데이터가져오는 작업, 타이머다는거
  // 이런건 useEffect 안에 많이 적습니다.
  useEffect(() => {
    console.log("안녕 count:" + count);
  });

  useEffect(() => {
    let watched = JSON.parse(localStorage.getItem("watched")) ?? [];
    watched.push(item.id);

    //Set으로 바꿨다가 다시 array로 만들기
    watched = new Set(watched);
    watched = Array.from(watched);

    localStorage.setItem("watched", JSON.stringify(watched));
  }, []);

  // [] 가 변할때마다 실행됨, 비워져있으면 mount될때만 실행
  useEffect(() => {
    console.log("2. main");
    let a = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => {
      // useEffect가 동작 전에 실행되는 clean up function
      console.log("1. clean up function");
      clearTimeout(a); // 기존타이머는 제거해주세요~

      // clean up function은
      // mount시 실행안됨, unmount시 실행됨
    };
  }, []);

  /**
   *    - 빡통식 정리시간
   *    useEffect(()=>{  }) 1. 재렌더링마다 코드 실행하고싶으면
   *
   *    useEffect(()=>{  }, []) 2. mount시 1회 코드 실행하고싶으면
   *
   *    useEffect(()=>{
   *      return () => {
   *          3. unmount시 1회 코드실행하고 싶으면
   *      }
   *    })
   *
   *    useEffect(()=>{
   *      return ()=>{
   *          4. useEffect 실행 전에 뭔가 실행 하려면 언제나 return () => {  }
   *      }
   *    }, [])
   *
   *    useEffect(()=>{count}) 5. 특정 state변경시에만 실행하려면 [state명]
   *
   */
  const [fade, setFade] = useState("");

  useEffect(() => {
    let a = setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      clearTimeout(a);
      setFade("");
    };
  }, [id]);

  // Context API
  let { contextApiStock } = useContext(Context1);

  let dispatch = useDispatch();

  return (
    <div className={`start ${fade}`}>
      {id >= 0 ? (
        <div className="container">
          {alert ? (
            <>
              <Box>
                <ColorBtn bg="yellow" onClick={() => setCount(++count)}>
                  버튼 : {count}
                </ColorBtn>
                <ColorBtn bg="blue" onClick={() => setCount(++count)}>
                  버튼 : {count}
                </ColorBtn>
                <ColorBtn bg="orange">2초 후에 안보여야함</ColorBtn>
              </Box>
            </>
          ) : null}

          {contextApiStock[0]}
          <div className="row mb-5">
            <div className="col-md-6">
              <img
                src={
                  "https://codingapple1.github.io/shop/shoes" +
                  (Number(id) + 1) +
                  ".jpg"
                }
                width="100%"
              />
            </div>
            <div className="col-md-6">
              {/* 현재url에입력한숫자 */}
              <h4 className="pt-5">{item.title}</h4>
              <p>{item.content}</p>
              <p>{item.price} 원</p>
              <button
                className="btn btn-danger"
                onClick={() => {
                  dispatch(addCart(item));
                }}
              >
                주문하기
              </button>
            </div>
          </div>
          <>
            <Nav variant="tabs" defaultActiveKey="link0">
              <Nav.Item onClick={() => setTab(0)}>
                <Nav.Link eventKey="link0">버튼0</Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={() => setTab(1)}>
                <Nav.Link eventKey="link1">버튼1</Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={() => setTab(2)}>
                <Nav.Link eventKey="link2">버튼2</Nav.Link>
              </Nav.Item>
            </Nav>
            <TabContent tab={tab} />
          </>
        </div>
      ) : (
        <div>없어요</div>
      )}
    </div>
  );
}

function TabContent({ tab }) {
  // let returnDiv;
  const [fade, setFade] = useState("");
  // 애니메이션 만들고 싶으면
  // 1. 애니메이션 동작 전 스타일을 담을 className 만들기
  // 2. 애니메이션 동작 후 스타일을 담을 className 만들기
  // 3. transition 속성도 추가
  // 4. 원할 때 2번 탈부착
  useEffect(() => {
    let a = setTimeout(() => {
      // Q. setTimeout 왜 씁니까
      // 리액트 18버전 이상부터는 automatic batch 라는 기능이 생겼습니다.
      // state 변경함수들이 연달아서 여러개 처리되어야한다면
      // state 변경함수를 다 처리하고 마지막에 한 번만 재렌더링됩니다.
      // 그래서 'end' 로 변경하는거랑 ' ' 이걸로 변경하는거랑 약간 시간차를 뒀습니다.
      // 찾아보면 setTimeout 말고 flushSync() 이런거 써도 될 것 같기도 합니다. automatic batching을 막아줍니다.
      setFade("end"); // <- 이거 2빠
    }, 100);
    return () => {
      clearTimeout(a);
      setFade(""); // <- 이거 1빠
    };
  }, [tab]);

  // if (tab == 0) {
  //   returnDiv = <div>내용0</div>;
  // } else if (tab == 1) {
  //   returnDiv = <div>내용1</div>;
  // } else if (tab == 2) {
  //   returnDiv = <div>내용2</div>;
  // }
  // return <div className={`start ${fade}`}>{returnDiv}</div>;

  // Context API
  let { contextApiStock } = useContext(Context1);

  return (
    <div className={`start ${fade}`}>
      {
        [
          <div>내용0 : {contextApiStock[0]}</div>,
          <div>내용1</div>,
          <div>내용2</div>,
        ][tab]
      }
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      {/* 
      /about/member로 접속시 <Outlet>자리에 아까의 <div> 박스들이 잘 보입니다. 
      그래서 유사한 서브페이지들이 많이 필요하다면 이렇게 만들어도 됩니다.
      */}
      <Outlet></Outlet>
    </div>
  );
}

function Card(props) {
  let navigate = useNavigate();
  return (
    <div
      className="col-md-4"
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigate(`/detail/${props.product.id}`);
      }}
    >
      <img
        src={
          process.env.PUBLIC_URL +
          "/img/shoes" +
          (props.product.id + 1) +
          ".jpg"
        }
        width="80%"
      />
      <h4>{props.product.title}</h4>
      <p>{props.product.content}</p>
      <p>{props.product.price}</p>
    </div>
  );
}

// 1. memo를 import 해와서
// 2. 원하는 컴포넌트 정의부분을 감싸면 됩니다.
// 근데 컴포넌트를 let 컴포넌트명 = function( ){ } 이런 식으로 만들어야 감쌀 수 있습니다.
// 그럼 이제 Child로 전송되는 props가 변하거나 그런 경우에만 재렌더링됩니다.
// Q. 어 그럼 memo는 좋은거니까 막써도 되겠네요?
// memo로 감싼 컴포넌트는 헛된 재렌더링을 안시키려고
// 기존 props와 바뀐 props를 비교하는 연산이 추가로 진행됩니다.
// props가 크고 복잡하면 이거 자체로도 부담이 될 수도 있습니다.
// 그래서 꼭 필요한 곳에만 사용합시다.
let Child = memo(function () {
  // Cart 컴포넌트 안에 Child 컴포넌트를 만들었습니다.
  // 그리고 버튼누를 때 Cart 컴포넌트가 재렌더링되게 만들어놨는데
  // 이 경우 <Child> 이것도 재렌더링됩니다.
  console.log("재랜더링됨");
  return <div>자식임</div>;
});

function fnUseMemo() {
  // 10억번 돌린결과
  return 235235235235235235;
}

// 장바구니
export const Cart = () => {
  // Redux store에 있던 state 가져다쓰는 법
  // 아무 컴포넌트에서 useSelector((state) => { return state } ) 쓰면 store에 있던 모든 state가 그 자리에 남습니다.
  let { user, cart } = useSelector((state) => state);
  let dispatch = useDispatch();
  let [count, setCount] = useState(0);

  // 비슷하게 생긴 useMemo
  // 비슷한 useMemo라는 문법도 있는데 이건 그냥 useEffect와 비슷한 용도입니다.
  // 컴포넌트 로드시 1회만 실행하고 싶은 코드가 있으면 거기 담으면 됩니다.
  let result = useMemo(
    // 1. 예를 들어서 반복문을 10억번 돌려야하는 경우
    // 2. 그 함수를 useMemo 안에 넣어두면 컴포넌트 로드시 1회만 실행됩니다.
    // 그럼 재렌더링마다 동작안하니까 좀 효율적으로 동작하겠죠?
    // useEffect 처럼 dependency도 넣을 수 있어서
    // 특정 state, props가 변할 때만 실행할 수도 있습니다.
    () => {
      return fnUseMemo();
    }
    // ,[state]
  );

  return (
    <div>
      <Child
      // count={count}
      ></Child>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      <h3>
        {user.name}({user.age})의 장바구니
      </h3>
      <button
        onClick={() => {
          dispatch(changeName());
          dispatch(increaseAge(1));
        }}
      >
        버튼
      </button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(addCart(item));
                  }}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <App2 />
    </div>
  );
};

let app2TestArray = new Array(100).fill(0);

function App2() {
  let [name, setName] = useState("");

  let [isPending, startTrasition] = useTransition();
  // - useTransition() 쓰면 그 자리에 [변수, 함수]가 남습니다.
  // - 그 중 우측에 있는 startTransition() 함수로 state변경함수 같은걸 묶으면
  // 그걸 다른 코드들보다 나중에 처리해줍니다.
  // isPending은 어디다 쓰냐면, startTransition() 으로 감싼 코드가 처리중일 때 true로 변하는 변수입니다.
  // useDeferredValue 이것도 비슷함
  // - useDeferredValue 안에 state를 집어넣으면 그 state가 변동사항이 생겼을 때 나중에 처리해줍니다.
  let state = useDeferredValue(name);

  return (
    <div>
      <input
        onChange={(e) => {
          startTrasition(() => {
            setName(e.target.value);
          });
        }}
      />
      {isPending
        ? "로딩중"
        : app2TestArray.map((e, i) => {
            return (
              <div key={i}>
                name : {name}, state : {state}
              </div>
            );
          })}
    </div>
  );
}

export default App;
