import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import bg from "./img/bg.png";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import data from "./data.js";
import {
  Route,
  Routes,
  Link,
  useNavigate,
  Outlet,
  useParams,
} from "react-router-dom";
import EventPage from "./routes/EventPage.js";
import styled from "styled-components";
import axios from "axios";

// 페이지나누는법(리엑트)
// 1. 컴포넌트 만들어서 상세페이지 내용 채움
// 2. 누가 /detail 접속하면 그 컴포넌트 보여줌
function App() {
  let [shoes, setShoes] = useState(data);
  //  페이지 이동기능을 만들고 싶으면 useNavigate() 씁니다.
  let navigate = useNavigate();

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
            {/* <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/detail">detail</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
      <div className="main-bg" style={{ backgroundImage: `url(${bg})` }}></div>
      {/* <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link> */}

      <Routes>
        <Route path="/" element={<MainPage shoes={shoes} />} />
        {/* url 파라미터 detail/:id */}
        <Route path="detail/:id" element={<Detail shoes={shoes} />} />
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
        {/* 404페이지는 */}
        <Route path="*" element={<div>없는페이지에요</div>} />
      </Routes>
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
  color: ${(props) => (props.bg == "blue" ? "white" : "black")};'
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

  return (
    <>
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
          <div className="row">
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
              <h4 className="pt-5">{item?.title}</h4>
              <p>{item?.content}</p>
              <p>{item?.price} 원</p>
              <button className="btn btn-danger">주문하기</button>
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
    </>
  );
}

function TabContent({ tab }) {
  if (tab == 0) {
    return <div>내용0</div>;
  } else if (tab == 1) {
    return <div>내용1</div>;
  } else if (tab == 2) {
    return <div>내용2</div>;
  }
  // return [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab];
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

export default App;
