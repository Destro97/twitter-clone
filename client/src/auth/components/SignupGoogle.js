import React from "react";
import GoogleButton from "react-google-button";

const SignupGoogle = props => {
  return (
    <div>
      <a href={props.url}>
        <GoogleButton type="light" onClick={props.click} />
      </a>
    </div>
  );
};

export default SignupGoogle;
