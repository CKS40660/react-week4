function Card({ product, openProductModal }) {
  const { title, imageUrl, description, origin_price, price } = product;
  return (
    <div className="card " style={{ height: "100%" }}>
      <img src={imageUrl} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <div className="d-flex ">
          <p className="me-auto">
            價格：
            <del>
              <small>{origin_price}</small>
            </del>
            {` ${price} 元`}
          </p>
          <button
            className="btn btn-primary"
            onClick={() => openProductModal(product)}
          >
            詳細資訊
          </button>
        </div>
      </div>
    </div>
  );
}
export default Card;
