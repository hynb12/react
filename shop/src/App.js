import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import bg from "./img/bg.png";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail";
import Card from "./component/Card";

// 페이지나누는법(리엑트)
// 1. 컴포넌트 만들어서 상세페이지 내용 채움
// 2. 누가 /detail 접속하면 그 컴포넌트 보여줌

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate(); // 페이지 이동 도와주는 함수

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/about");
              }}
            >
              about
            </Nav.Link>
            {/* <Nav.Link
              onClick={() => {
                navigate(-1);
              }}
            >
              뒤로가기
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate(1);
              }}
            >
              앞으로가기
            </Nav.Link> */}
            <Nav.Link
              onClick={() => {
                navigate("/event/one");
              }}
            >
              이벤트1
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/event/two");
              }}
            >
              이벤트2
            </Nav.Link>
            {/* <Link to="/"> 홈</Link><Link to="/detail"> 상세</Link> */}
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Main shoes={shoes} />} />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="/about" element={<About />}>
          {/* 
          nested route 장점
          1. router 작성이 간단해짐
          2. nested route 접속시엔 element 2개나 보임(어디에 보여줄지 잘 작성해야함 Outlet)
          */}
          <Route path="member" element={<>멤버임</>} />
          <Route path="location" element={<>위치정보임</>} />
        </Route>
        <Route path="event" element={<Event />}>
          <Route path="one" element={<>첫 주문시 양배추즙 서비스</>}></Route>
          <Route path="two" element={<>생일기념 쿠폰 받기</>}></Route>
        </Route>
        <Route path="*" element={<>없는 페이지 (404 페이지)</>} />
      </Routes>
    </div>
  );
}

const Main = ({ shoes }) => {
  return (
    <>
      <div
        className="main-bg"
        style={{ backgroundImage: `url(${bg.png})` }}
      ></div>
      <Container>
        <Row>
          {shoes.map((a, i) => {
            return <Card a={a} i={i} />;
          })}
        </Row>
      </Container>
    </>
  );
};

const About = () => {
  return (
    <>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </>
  );
};

const Event = () => {
  return (
    <>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </>
  );
};

export default App;
