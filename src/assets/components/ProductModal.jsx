function ProductModal({
  productModalRef,
  tempProduct,
  openTemplateModal,
  openAlertModal,
}) {
  // 記得要return
  return (
    <div
      ref={productModalRef}
      className="modal fade"
      id="productModal"
      tabIndex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{tempProduct.title}</h5>
            <span className="btn btn-primary btn-sm ms-3">
              {tempProduct.category}
            </span>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-start">
            <p>{tempProduct.description} </p>
            {tempProduct.imagesUrl?.map((img, index) => {
              return <img src={img} alt={tempProduct.title} key={index} />;
            })}
            <p className="mt-2 mb-0">
              {tempProduct.is_enabled
                ? `庫存 ${tempProduct.storageNum} ${tempProduct.unit}`
                : "已售完"}
            </p>
            <p>
              售價：
              <span className="fw-bold fs-3">{tempProduct.price}</span>
            </p>
          </div>
          <div className="modal-footer">
            <div className="btn-group" role="group" aria-label="Basic example">
              <button
                type="button"
                className="btn btn-primary"
                id={tempProduct.id}
                aria-label="Close"
                onClick={() => openTemplateModal(tempProduct, "edit")}
              >
                編輯
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={openAlertModal}
              >
                刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
