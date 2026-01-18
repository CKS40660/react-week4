function AlertModal({ alertModalRef, closeAlertModal, delForm }) {
  return (
    <div
      className="modal fade"
      id="alertModal"
      tabIndex="-1"
      ref={alertModalRef}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="alertModal">
              確認是否刪除
            </h1>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                closeAlertModal();
              }}
            >
              離開
            </button>
            <button type="button" className="btn btn-primary" onClick={delForm}>
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertModal;
