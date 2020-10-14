import React from "react";
import SearchResult from "../../components/SearchResult/SearchResult";
import Typography from "@material-ui/core/Typography";

class SearchResults extends React.Component {
  alreadyFavorite = () => {
    if (this.props.user) {
      return true;
    } else {
      return false;
    }
  };

  // take some items out of return and do it here: using method inside a class.
  appendingResult = async () => {
    const results = [];
    if (this.props.searchData) {
      console.log("i am here");
      console.log(this.props.searchData);

      for (let i = 0; i < this.props.searchData.length; i++) {
        // if (this.alreadyFavorite) {
        //   this.props.searchData.checkFav = true;
        // } else {
        //   this.props.searchData.checkFav = false;
        // }
        results.push(
          <SearchResult
            user={this.props.user}
            result={this.props.searchData[i]}
            // checkFav={true}
          />
        );
        // results.push(<li>{this.props.searchData[i].name}</li>);
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
        <SearchResult
          user={this.props.user}
          result={item}
          myProducts={this.props.myProducts}
          handleUpdateMyProducts={this.props.handleUpdateMyProducts}
          alertMsg={this.props.alertMsg}
          changeAlertMsg={this.props.changeAlertMsg}
        />
      ));
    } else if (this.props.searchData) {
      results = (
        <Typography style={{ color: "white" }}>
          SORRY, WE CURRENTLY CANNOT FIND THIS ITEM. PLEASE SEARCH AGAIN BY
          PRODUCT'S NAME
        </Typography>
      );
    }
    //-----------
    return (
      <div>
        <div style={styles.results}>{results}</div>
      </div>
    );
  }
}

export default SearchResults;
