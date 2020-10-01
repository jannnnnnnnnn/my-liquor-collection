import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import apiService from "../../utils/apiService";

import LandingPage from "../LandingPage/LandingPage";
import ProductsPage from "../ProductsPage/ProductsPage";
import LoginPage from "../LoginPage/LoginPage";
import SignupPage from "../SignupPage/SignupPage";
import MyproductsPage from "../MyproductsPage/MyproductsPage";

import userService from "../../utils/userService";
import NavBar from "../../components/NavBar/NavBar";

class App extends React.Component {
  state = {
    user: null,
    searchInput: "",
    searchData: null,
    myProducts: [],
  };
  handleUpdateMyProducts = () => {
    console.log("I am in handleUpdateMyProducts");
  };
  handleinputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      console.log("do validate");
      const productData = await apiService.getProductbyName(
        this.state.searchInput
      );
      this.setState({ searchData: productData });
      console.log(this.state.searchData[0]);
      this.props.history.push("/products");
    }
  };

  handleSignupOrLogin = () => {
    this.setState(
      {
        user: userService.getUser(),
      },
      () =>
        userService
          .indexMyProducts()
          .then((myProducts) => this.setState({ myProducts }))
    );
  };

  handleUpdateMyProducts = () => {
    console.log("i am in handleUpdateMyProducts");
    userService
      .indexMyProducts()
      .then((myProducts) => this.setState({ myProducts }));
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  render() {
    return (
      <div className="App">
        <header>Janet's new App</header>
        <NavBar
          {...this.state}
          handleinputChange={this.handleinputChange}
          handleKeyDown={this.handleKeyDown}
          handleSignupOrLogin={this.handleSignupOrLogin}
          handleLogout={this.handleLogout}
        />
        <Switch>
          <Route exact path="/" render={() => <LandingPage />} />
          <Route
            exact
            path="/products"
            render={() => (
              <ProductsPage
                user={this.state.user}
                searchData={this.state.searchData}
                myProducts={this.state.myProducts}
                handleUpdateMyProducts={this.handleUpdateMyProducts}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={({ history }) => (
              <SignupPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={({ history }) => (
              <LoginPage
                user={this.state.user}
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            )}
          />
          <Route
            exact
            path="/favourites"
            render={() => (
              <MyproductsPage
                user={this.state.user}
                myProducts={this.state.myProducts}
                handleUpdateMyProducts={this.handleUpdateMyProducts}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
export default App;
