import React from "react";
import SearchResult from "../../components/SearchResult/SearchResult";

class SearchResults extends React.Component {
  // question: how I would be able to take some items out of return and do it here? answer: using method inside a class.
  appendingResult = (props) => {
    const results = [];
    if (this.props.searchData) {
      console.log("i am here");
      console.log(this.props.searchData);

      for (let i = 0; i < this.props.searchData.length; i++) {
        results.push(<li>{this.props.searchData[i].name}</li>);
      }
    }
    // for loop
    // let result;
    // for (result of this.props.searchData) {
    //   results.push(<li>{result.name}</li>);
    //   console.log(result);
    // }
    return results;
  };
  //----------

  render() {
    //styles
    const styles = {
      results: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      },
      backcolor: {
        backgroundColor: "black",
      },
    };
    //---------
    let results;
    if (this.props.searchData && this.props.searchData.length > 0) {
      results = this.props.searchData.map((item, idx) => (
        <SearchResult user={this.props.user} result={item} />
      ));
    } else if (this.props.searchData) {
      results = <div>no result</div>;
    }
    return (
      <div style={styles.backcolor}>
        <div>Search Results</div>
        {/* <div>{props.searchData && props.searchData[0].id}</div> */}
        {/* <div>{this.appendingResult(this.props)}</div> */}
        <hr />
        <div style={styles.results}>{results}</div>

        {/* <div>
          {this.props.searchData.length > 0 ? (
            this.props.searchData.map((item, idx) => (
              <SearchResult result={item} />
              // <div key={idx}>{item.id}</div>
            ))
          ) : (
            <div>no result</div>
          )}
        </div> */}
      </div>
    );
  }
}

export default SearchResults;
