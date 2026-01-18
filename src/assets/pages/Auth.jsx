function Auth({ getAuthInput, checkLogin, authInput }) {
  return (
    <div className="container h-100 d-flex align-items-center justify-content-center">
      <form onSubmit={checkLogin}>
        <div className="mb-3">
          <label htmlFor="AuthInputEmail" className="form-label">
            信箱
          </label>
          <input
            type="email"
            name="username"
            className="form-control"
            id="AuthInputEmail"
            aria-describedby="emailHelp"
            value={authInput.username}
            onChange={(e) => getAuthInput(e)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="AuthInputPassword" className="form-label">
            密碼
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="AuthInputPassword"
            value={authInput.password}
            onChange={(e) => getAuthInput(e)}
            required
          />
        </div>
        <div className="d-flex">
          <button type="submit" className="btn btn-primary ms-auto">
            登入
          </button>
        </div>
      </form>
    </div>
  );
}

export default Auth;
