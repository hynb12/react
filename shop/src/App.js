import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import bg from "./img/bg.png";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import data from "./data.js";
import { Route, Routes, Link } from "react-router-dom";

// 페이지나느눈법(리엑트)
// 1. 컴포넌트 만들어서 상세페이지 내용 채움
// 2. 누가 /detail 접속하면 그 컴포넌트 보여줌

function App() {
  <Routes>
    <route path="/detail" element={<div>상세페이지임</div>}></route>
    <route />
  </Routes>;

  let [shoes, setShoes] = useState(data);

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="main-bg" style={{ backgroundImage: `url(${bg})` }}></div>
      <Container>
        <Row>
          {shoes.map((a, i) => {
            return <Card a={a} i={i} />;
          })}
        </Row>
      </Container>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img
        src={process.env.PUBLIC_URL + "/img/shoes" + (props.i + 1) + ".jpg"}
        width="80%"
      />
      <h4>{props.a.title}</h4>
      <p>{props.a.content}</p>
      <p>{props.a.price}</p>
    </div>
  );
}

export default App;
