import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import bg from "./img/bg.png";
import Row from "react-bootstrap/Row";
import { useState } from "react";
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
                navigate("/detail");
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

function Detail(props) {
  // 유저가 URL파라미터에 입력한거 가져오려면
  let { id } = useParams();

  return (
    <>
      {id >= 0 ? (
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                src={"https://codingapple1.github.io/shop/shoes" + id + ".jpg"}
                width="100%"
              />
            </div>
            <div className="col-md-6">
              {/* 현재url에입력한숫자 */}
              <h4 className="pt-5">{props.shoes[id].title}</h4>
              <p>{props.shoes[id].content}</p>
              <p>{props.shoes[id].price}</p>
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
