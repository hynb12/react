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
  );
}
export default Card;
