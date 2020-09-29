import React from "react";

import LoginForm from "../../components/LoginForm/LoginForm";
import SignupForm from "../../components/SignupForm/SignupForm";
const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};

export default function LoginPage(props) {
  return (
    <div>
      <LoginForm {...props} />
    </div>
  );
}
