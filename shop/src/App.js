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
import Card from "./component/Card.js";
import EventPage from "./routes/EventPage.js";
import styled from "styled-components";

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
        <Route path="" element={<MainPage shoes={shoes} />} />
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
  return (
    <Container>
      <Row>
        {shoes.map((a, i) => {
          return <Card product={a} idx={i} />;
        })}
      </Row>
    </Container>
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

  // useEffect 안에 적은 코드는 html 렌더링 이후에 동작합니다.
  let [count, setCount] = useState(0);
  let [hidden, setHidden] = useState(false);

  // mount, update 할때 실행됨
  useEffect(() => {
    console.log("안녕 count:" + count);
  });

  // [] 가 변할때마다 실행됨, 비워져있으면 mount될때만 실행
  useEffect(() => {
    console.log("2");
    let a = setTimeout(() => {
      setHidden(true);
    }, 2000);
    return () => {
      // useEffect가 동작 전에 실행되는 clean up function
      console.log("1");
      clearTimeout(a); // 기존타이머는 제거해주세요~
    };
  }, []);

  // 컴포넌트의 핵심 기능은 html 렌더링이라
  // 그거 외의 쓸데없는 기능들은 useEffect 안에 적으라는 소리입니다.
  // 오래걸리는 반복연산, 서버에서 데이터가져오는 작업, 타이머다는거
  // 이런건 useEffect 안에 많이 적습니다.

  return (
    <>
      {id >= 0 ? (
        <div className="container">
          <Box>
            <ColorBtn bg="yellow" onClick={() => setCount(++count)}>
              버튼 : {count}
            </ColorBtn>
            <ColorBtn bg="blue" onClick={() => setCount(++count)}>
              버튼 : {count}
            </ColorBtn>
            {hidden ? null : (
              <ColorBtn bg="orange">2초 후에 안보여야함</ColorBtn>
            )}
          </Box>
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
        </div>
      ) : (
        <div>없어요</div>
      )}
    </>
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

export default App;
