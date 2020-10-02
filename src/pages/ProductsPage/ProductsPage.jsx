import React from "react";
import SearchResults from "../../components/SearchResults/SearchResults";

export default function ProductsPage(props) {
  return (
    <div style={{ background: "#748b9c" }}>
      <SearchResults
        user={props.user}
        searchData={props.searchData}
        myProducts={props.myProducts}
        changeAlertMsg={props.changeAlertMsg}
        handleUpdateMyProducts={props.handleUpdateMyProducts}
      />
    </div>
  );
}
