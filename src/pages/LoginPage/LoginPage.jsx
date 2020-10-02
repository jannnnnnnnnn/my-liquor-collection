import React, { useEffect } from "react";

import LoginForm from "../../components/LoginForm/LoginForm";

export default function LoginPage(props) {
  useEffect(() => {
    props.resetAlertMsg();
  }, []);
  return (
    <div>
      <LoginForm {...props} />
    </div>
  );
}
