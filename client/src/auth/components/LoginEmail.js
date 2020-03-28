import React from "react";

const LoginEmail = props => {
  return (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={props.changed("email")}
          type="email"
          className="form-control"
          value={props.state.email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={props.changed("password")}
          type="password"
          className="form-control"
          value={props.state.password}
        />
      </div>
      <button onClick={props.submit} className="btn btn-raised btn-primary">
        Submit
      </button>
    </form>
  );
};

export default LoginEmail;
