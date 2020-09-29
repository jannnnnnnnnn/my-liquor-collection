import React from "react";
import SearchResults from "../../components/SearchResults/SearchResults";
import NavBar from "../../components/NavBar/NavBar";

export default function ProductsPage(props) {
  return (
    <div>
      <SearchResults user={props.user} searchData={props.searchData} />
    </div>
  );
}
