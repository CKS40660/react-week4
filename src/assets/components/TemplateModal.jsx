function TemplateModal({
  formType,
  editForm,
  closeTemplateModal,
  templateRef,
  templateForm,
  handleTemplateChange,
}) {
  return (
    <div className="modal fade" id="addForm" tabIndex="-1" ref={templateRef}>
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addFormLabel">
              {formType == "edit" ? "修改產品" : "新增產品"}
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeTemplateModal}
            ></button>
          </div>
          <div className="modal-body d-flex">
            <div className="col-4">
              <div className="mb-3 me-4 text-start">
                <label htmlFor="inputUrl" className="form-label">
                  主圖<span className="text-danger">*</span>
                </label>
                <input
                  name="imageUrl"
                  type="text"
                  className="form-control"
                  required
                  value={templateForm.imageUrl}
                  onChange={handleTemplateChange}
                />
              </div>
            </div>
            <div className="col-8">
              <form className="text-start row row-cols-2">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      商品名稱 <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      id="inputTitle"
                      aria-describedby="titleHelp"
                      value={templateForm.title}
                      onChange={handleTemplateChange}
                    />
                    <div id="titleHelp" className="form-text" required>
                      格式 [買/賣]商品名稱
                    </div>
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="title" className="select-label mb-2">
                    商品類別 <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select mb-3"
                    name="category"
                    aria-label="Default select category"
                    required
                    value={templateForm.category}
                    onChange={handleTemplateChange}
                  >
                    <option defaultValue="default"></option>
                    <option value="投手">投手</option>
                    <option value="野手">野手</option>
                    <option value="明星">明星</option>
                    <option value="新秀">新秀</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="inputContent" className="form-label">
                    商品內容
                  </label>
                  <input
                    type="text"
                    name="content"
                    className="form-control"
                    id="inputContent"
                    value={templateForm.content}
                    onChange={handleTemplateChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputDescription" className="form-label">
                    商品敘述
                  </label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    id="inputDescription"
                    value={templateForm.description}
                    onChange={handleTemplateChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="inputOriginPrice" className="form-label">
                    原價<span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="origin_price"
                    id="inputOriginPrice"
                    required
                    min="0"
                    value={templateForm.origin_price}
                    onChange={handleTemplateChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="inputPrice" className="form-label">
                    折價<span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    id="inputPrice"
                    required
                    min="0"
                    value={templateForm.price}
                    onChange={handleTemplateChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputStorageNum" className="form-label">
                    庫存數量<span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    name="storageNum"
                    className="form-control"
                    id="inputStorageNum"
                    required
                    min="0"
                    value={templateForm.storageNum}
                    onChange={handleTemplateChange}
                  />
                </div>
                <div className="form-check ms-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="is_enabledCheck"
                    name="is_enabled"
                    required
                    checked={templateForm.is_enabled}
                    onChange={handleTemplateChange}
                  />
                  <label className="form-check-label" htmlFor="is_enabledCheck">
                    是否販售<span className="text-danger">*</span>
                  </label>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <p>
              <span className="text-danger">*</span>為必填項目
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => editForm()}
            >
              {formType == "edit" ? "修改" : "新增"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateModal;
