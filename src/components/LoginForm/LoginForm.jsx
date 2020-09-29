import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import userService from "../../utils/userService";
import { Link } from "react-router-dom";

class LoginPage extends React.Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(this.state);
      // Let <App> know a user has signed up!
      this.props.handleSignupOrLogin();
      // Successfully signed up
      this.props.history.push("/");
    } catch (err) {
      // Use a modal or toast in your apps instead of alert
      alert("Invalid Credentials!");
    }
  };

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
        <header>Log In</header>
        <form style={styles.main} onSubmit={this.handleSubmit}>
          <FormControl>
            <InputLabel htmlFor="email">Email address</InputLabel>
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
          <Button style={styles.links} type="submit" variant="contained">
            Log In
          </Button>

          <Link style={{ textDecoration: "none", color: "blue" }} to="/">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

export default LoginPage;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
// }));

// export default function ComposedTextField() {
//   const [loginInfo, setLoginInfo] = React.useState({
//     email: "",
//     password: "",
//   });

//   const classes = useStyles();

//   const handleChange = (e) => {
//     setLoginInfo((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await userService.login(loginInfo);
//       // Let <App> know a user has signed up!
//       this.props.handleSignupOrLogin();
//       // Successfully signed up - show GamePage
//       this.props.history.push("/");
//     } catch (err) {
//       // Use a modal or toast in your apps instead of alert
//       alert("Invalid Credentials!");
//     }
//   };

//   return (
//     <form
//       className={classes.root}
//       noValidate
//       autoComplete="off"
//       onSubmit={handleSubmit}
//     >
//       <FormControl>
//         <InputLabel htmlFor="email">Email address</InputLabel>
//         <Input
//           id="email"
//           name="email"
//           value={loginInfo.email}
//           onChange={handleChange}
//         />
//       </FormControl>
//       <FormControl>
//         <InputLabel htmlFor="password">Password</InputLabel>
//         <Input
//           id="password"
//           name="password"
//           value={loginInfo.password}
//           onChange={handleChange}
//         />
//       </FormControl>
//       <Button variant="contained">Log In</Button>
//     </form>
//   );
// }
