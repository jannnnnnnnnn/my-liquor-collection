import React from "react";
import SearchResults from "../../components/SearchResults/SearchResults";

export default function ProductsPage(props) {
  return (
    <div>
      <SearchResults
        user={props.user}
        searchData={props.searchData}
        myProducts={props.myProducts}
        handleUpdateMyProducts={props.handleUpdateMyProducts}
      />
    </div>
  );
}
