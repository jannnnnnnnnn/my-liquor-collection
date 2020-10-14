import React from "react";
import Typography from "@material-ui/core/Typography";

import Myproduct from "../../components/Myproduct/Myproduct";
import ProductForm from "../../components/ProductForm/ProductForm";

class MyproductsPage extends React.Component {
  componentDidMount() {
    this.props.resetAlertMsg();
  }
  render() {
    const productRows = this.props.myProducts.map((myProduct, idx) => (
      <Myproduct
        myProduct={myProduct}
        user={this.props.user}
        handleUpdateMyProducts={this.props.handleUpdateMyProducts}
        productLocation="apiProduct"
      />
    ));
    const localProductRows = this.props.mylocalProducts.map(
      (myProduct, idx) => (
        <Myproduct
          myProduct={myProduct}
          user={this.props.user}
          handleUpdateMyProducts={this.props.handleUpdateMyProducts}
          productLocation="localProduct"
          localProducts={this.props.localProducts}
        />
      )
    );

    return (
      <div style={{ background: "#748b9c" }}>
        <Typography variant="h4" style={{ color: "white" }}>
          My Favourites
        </Typography>
        {this.props.myProducts.length > 0 ? (
          productRows
        ) : (
          <Typography>Search and Add your Favourites</Typography>
        )}
        {this.props.mylocalProducts.length > 0 ? (
          localProductRows
        ) : (
          <Typography>
            Can't find what you are looking for? Create some of your own
            products!
          </Typography>
        )}
        <ProductForm
          user={this.props.user}
          retriveAllLocalProducts={this.props.retriveAllLocalProducts}
          retrivemyProducts={this.props.retrivemyProducts}
          changeAlertMsg={this.props.changeAlertMsg}
        />
      </div>
    );
  }
}

export default MyproductsPage;
