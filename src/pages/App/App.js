import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import apiService from "../../utils/apiService";

import LandingPage from "../LandingPage/LandingPage";
import ProductsPage from "../ProductsPage/ProductsPage";
import LoginPage from "../LoginPage/LoginPage";
import SignupPage from "../SignupPage/SignupPage";
import MyproductsPage from "../MyproductsPage/MyproductsPage";
import Alert from "@material-ui/lab/Alert";

import userService from "../../utils/userService";
import productService from "../../utils/productService";

import NavBar from "../../components/NavBar/NavBar";

class App extends React.Component {
  state = {
    user: null,
    searchInput: "",
    searchData: null,
    myProducts: [],
    localProducts: null,
    mylocalProducts: null,
    alertMsg: null,
  };
  changeAlertMsg = (severity, msg) => {
    this.setState({ alertMsg: <Alert severity={severity}>{msg}</Alert> });
  };
  resetAlertMsg = () => {
    this.setState({ alertMsg: null });
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
      //find index all local products and put it in state.localProducts
      this.resetAlertMsg();
      this.props.history.push("/products");
    }
  };

  retriveAllLocalProducts = async () => {
    const localProducts = await productService.index();
    console.log(localProducts);
    this.setState({ localProducts });
  };

  retrivemyProducts = async () => {
    console.log("retrivingmyproducts");
    userService
      .indexMyProducts()
      .then((myProducts) => this.setState({ myProducts }));
    userService
      .indexMylocalProducts()
      .then((mylocalProducts) => this.setState({ mylocalProducts }));
  };

  componentDidMount() {
    this.retriveAllLocalProducts();
  }

  handleSignupOrLogin = () => {
    this.setState(
      {
        user: userService.getUser(),
      },
      () => {
        this.retrivemyProducts();
        // userService
        //   .indexMyProducts()
        //   .then((myProducts) => this.setState({ myProducts }));
        // userService
        //   .indexMylocalProducts()
        //   .then((mylocalProducts) => this.setState({ mylocalProducts }));
      }
    );
  };

  handleUpdateMyProducts = (productLocation) => {
    console.log("i am in handleUpdateMyProducts");
    if (productLocation == "apiProduct") {
      userService
        .indexMyProducts()
        .then((myProducts) => this.setState({ myProducts }));
    } else if (productLocation == "localProduct") {
      userService
        .indexMylocalProducts()
        .then((mylocalProducts) => this.setState({ mylocalProducts }));
    }
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  render() {
    return (
      <div className="App">
        {/* <header>Janet's new App</header> */}
        <NavBar
          {...this.state}
          handleinputChange={this.handleinputChange}
          handleKeyDown={this.handleKeyDown}
          handleSignupOrLogin={this.handleSignupOrLogin}
          handleLogout={this.handleLogout}
        />
        <div>{this.state.alertMsg}</div>

        <Switch>
          <Route
            exact
            path="/"
            render={() => <LandingPage resetAlertMsg={this.resetAlertMsg} />}
          />
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
                changeAlertMsg={this.changeAlertMsg}
                resetAlertMsg={this.resetAlertMsg}
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
                resetAlertMsg={this.resetAlertMsg}
                changeAlertMsg={this.changeAlertMsg}
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
                resetAlertMsg={this.resetAlertMsg}
                changeAlertMsg={this.changeAlertMsg}
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
                mylocalProducts={this.state.mylocalProducts}
                localProducts={this.state.localProducts}
                handleUpdateMyProducts={this.handleUpdateMyProducts}
                retriveAllLocalProducts={this.retriveAllLocalProducts}
                retrivemyProducts={this.retrivemyProducts}
                resetAlertMsg={this.resetAlertMsg}
                changeAlertMsg={this.changeAlertMsg}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
export default App;
