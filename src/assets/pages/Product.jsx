import Card from "../components/Card";

function Product({ openTemplateModal, logout, products, openProductModal }) {
  return (
    <div className="container text-center py-5">
      <header>
        <h1>賣場商品</h1>
        <div className="d-flex">
          <button
            className="btn btn-primary ms-auto me-3"
            onClick={() => openTemplateModal()}
          >
            新增商品
          </button>
          <button className="btn btn-sm" onClick={logout}>
            登出
          </button>
        </div>
      </header>
      <section className="py-5">
        <div className="row row-cols-2">
          {products.map((product) => {
            return (
              <div className="col g-3" key={product.id}>
                <Card product={product} openProductModal={openProductModal} />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Product;
