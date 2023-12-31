<<<<<<< HEAD
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Detail() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">상품명</h4>
          <p>상품설명</p>
          <p>120000원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}
=======
import { useState } from "react";
import { useParams } from "react-router-dom";

const Detail = ({ shoes }) => {
  // 현재 url에 입력한 숫자
  let { id } = useParams();

  // 현재 shoes라는 상품데이터들 안엔 id : 0 이런 영구번호가 있습니다.
  // 그럼 현재 /:id 자리에 입력한 값과 영구번호가 같은 상품을 찾아서
  // 데이터바인딩해주면 되는게 아닐까요.
  // 자바스크립트엔 .find() 라는 문법이 있는데 이거 쓰면 array 자료안에서 원하는 항목만 찾아올 수 있습니다.
  // array자료.find(()=>{ return 조건식 })
  // 이렇게 쓰면 조건식에 맞는 자료를 찾아서 이 자리에 남겨줍니다.
  // 1. find()는 array 뒤에 붙일 수 있으며 return 조건식 적으면 됩니다. 그럼 조건식에 맞는 자료 남겨줌
  // 2. find() 콜백함수에 파라미터 넣으면 array자료에 있던 자료를 뜻합니다. 전 x라고 작명해봤음
  // 3. x.id == id 라는 조건식을 써봤습니다. 그럼 array자료.id == url에입력한번호 일 경우 결과를 변수에 담아줍니다.
  // 그럼 {상품1개} 이런거 남을듯요 출력해봅시다.
  // 4. 마지막으로 찾은 {상품1개}를 html에 데이터바인딩해놨습니다.
  // 더 짧게 쓰고 싶으면
  // props.shoes.find((x) => x.id == id )
  // 이렇게 써도 똑같습니다. arrow function에서 return과 중괄호는 동시에 생략가능
  let 찾은상품 = shoes.find(function (sh) {
    return sh.id == id;
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img
              src={
                "https://codingapple1.github.io/shop/shoes" +
                (찾은상품.id + 1) +
                ".jpg"
              }
              width="100%"
            />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{찾은상품.title}</h4>
            <p>{찾은상품.content}</p>
            <p>{찾은상품.price}원</p>
            <button className="btn btn-danger">주문하기</button>
          </div>
        </div>
      </div>
    </>
  );
};
>>>>>>> 4b3c7286875ffc15c5670ac1332cb07eac6b380c

export default Detail;
