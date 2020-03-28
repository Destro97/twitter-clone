import React from "react";

const SignupEmail = props => {
  return (
    <form>
      <div className="form-group">
        <label className="text-muted">First Name</label>
        <input
          onChange={props.changed("firstName")}
          type="text"
          className="form-control"
          // value={props.state.firstNname}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Last Name</label>
        <input
          onChange={props.changed("lastName")}
          type="text"
          className="form-control"
          // value={props.state.lastName}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Handle</label>
        <input
          onChange={props.changed("handle")}
          type="text"
          className="form-control"
          // value={props.state.handle}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={props.changed("email")}
          type="email"
          className="form-control"
          // value={props.state.email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={props.changed("password")}
          type="password"
          className="form-control"
          // value={props.state.password}
        />
      </div>
      <button onClick={props.submit} className="btn btn-raised btn-primary">
        Submit
      </button>
    </form>
  );
};

export default SignupEmail;
