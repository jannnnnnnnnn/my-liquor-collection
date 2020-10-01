import React from "react";
import Myproduct from "../../components/Myproduct/Myproduct";
import userService from "../../utils/userService";
import ProductForm from "../../components/ProductForm/ProductForm";

class MyproductsPage extends React.Component {
  render() {
    const productRows = this.props.myProducts.map((myProduct, idx) => (
      <Myproduct
        myProduct={myProduct}
        user={this.props.user}
        handleUpdateMyProducts={this.props.handleUpdateMyProducts}
      />
    ));

    return (
      <div>
        <header>My Favourite List page</header>
        {this.props.myProducts.length > 0 ? (
          productRows
        ) : (
          <p>Nothing in Here Yet</p>
        )}
        <ProductForm user={this.props.user} />
      </div>
    );
  }
}

export default MyproductsPage;
