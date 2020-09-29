import React from "react";

import SignupForm from "../../components/SignupForm/SignupForm";

class SignupPage extends React.Component {
  state = { message: "" };
  updateMessage = (msg) => {
    this.setState({ message: msg });
  };
  render() {
    return (
      <div>
        <SignupForm {...this.props} updateMessage={this.updateMessage} />
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default SignupPage;
