import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import bg from "./img/bg.png";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import data from "./data.js";
<<<<<<< HEAD
import { Route, Routes, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail.js";
=======
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail";
import Card from "./component/Card";
>>>>>>> 4b3c7286875ffc15c5670ac1332cb07eac6b380c

// 페이지나누는법(리엑트)
// 1. 컴포넌트 만들어서 상세페이지 내용 채움
// 2. 누가 /detail 접속하면 그 컴포넌트 보여줌
function App() {
  let [shoes, setShoes] = useState(data);
<<<<<<< HEAD
  //  페이지 이동기능을 만들고 싶으면 useNavigate() 씁니다.
  let navigate = useNavigate();
=======
  let navigate = useNavigate(); // 페이지 이동 도와주는 함수
>>>>>>> 4b3c7286875ffc15c5670ac1332cb07eac6b380c

  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand>ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
<<<<<<< HEAD
                // navigate(-1); // 뒤로가기(-2하면 2번감)
=======
>>>>>>> 4b3c7286875ffc15c5670ac1332cb07eac6b380c
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
<<<<<<< HEAD
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
        <Route path="detail" element={<Detail />} />
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
=======
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
>>>>>>> 4b3c7286875ffc15c5670ac1332cb07eac6b380c
  );
};

<<<<<<< HEAD
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

function EventPage() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
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

function Card(props) {
  return (
    <div className="col-md-4">
      <img
        src={process.env.PUBLIC_URL + "/img/shoes" + (props.idx + 1) + ".jpg"}
        width="80%"
      />
      <h4>{props.product.title}</h4>
      <p>{props.product.content}</p>
      <p>{props.product.price}</p>
    </div>
=======
const About = () => {
  return (
    <>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </>
>>>>>>> 4b3c7286875ffc15c5670ac1332cb07eac6b380c
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
