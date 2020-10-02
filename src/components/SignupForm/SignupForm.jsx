import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../utils/userService";

class SignupForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordConf: "",
  };

  handleChange = (e) => {
    this.props.updateMessage("");
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.signup(this.state);
      // Let <App> know a user has signed up!
      this.props.handleSignupOrLogin();
      // Successfully signed up - show GamePage
      this.props.history.push("/");
    } catch (err) {
      // Invalid user data (probably duplicate email)
      this.props.updateMessage(err.message);
    }
  };

  isFormInvalid() {
    return !(
      this.state.name &&
      this.state.email &&
      this.state.password === this.state.passwordConf
    );
  }

  render() {
    const styles = {
      main: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "10px",
      },
      links: {
        margin: "10px",
      },
    };
    return (
      <div style={styles.main}>
        <header>Sign Up</header>
        <form style={styles.main} onSubmit={this.handleSubmit}>
          <FormControl>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">Confirm Password</InputLabel>
            <Input
              id="passwordConf"
              name="passwordConf"
              type="password"
              value={this.state.passwordConf}
              onChange={this.handleChange}
            />
          </FormControl>
          <Button
            style={styles.links}
            type="submit"
            variant="contained"
            disabled={this.isFormInvalid()}
          >
            Sign Up
          </Button>

          <Link style={{ textDecoration: "none", color: "blue" }} to="/">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

export default SignupForm;
