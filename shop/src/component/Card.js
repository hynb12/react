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

export default Card;
