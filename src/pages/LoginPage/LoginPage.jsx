import React from "react";

import LoginForm from "../../components/LoginForm/LoginForm";

export default function LoginPage(props) {
  return (
    <div>
      <LoginForm {...props} />
    </div>
  );
}
