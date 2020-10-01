import React, { useEffect } from "react";
import {
  FormControl,
  Input,
  InputLabel,
  Button,
  Box,
  Typography,
  TextField,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

import userService from "../../utils/userService";
import { Link } from "react-router-dom";
import apiService from "../../utils/apiService";

export default function Myproduct(props) {
  const [myrating, setMyrating] = React.useState(props.myProduct.myrating);
  const [mynote, setMynote] = React.useState(props.myProduct.mynote);
  const [productData, setProductData] = React.useState([]);
  // const [myProductInfo, setMyProductInfo] = React.useState({
  //   myrating: props.myProduct.myrating,
  //   mynote: props.myProduct.mynote,
  // });

  // const handleChange = (e) => {
  //   let eventInput = e.target;
  //   setMyProductInfo((prev) => ({
  //     ...prev,
  //     [eventInput.name]: eventInput.value,
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("i am in myproduct handleSubmit");
    let myProductInfo = { myrating, mynote };
    console.log("mynote =" + myProductInfo.mynote);

    try {
      await userService.updateMyProduct(props.myProduct._id, myProductInfo);
      props.handleUpdateMyProducts();
    } catch (err) {
      alert(err);
    }
    // need to add handleUpdateMyProducts
    //update state
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log("i am in myproduct handleDelete");
    try {
      await userService.deleteMyProduct(props.myProduct._id);
      props.handleUpdateMyProducts();
      alert("product deleted");
    } catch (err) {
      alert(err);
    }
  };
  //on mount fetch product info
  useEffect(() => {
    fetchProductInfo();
  }, []);

  const fetchProductInfo = async (e) => {
    const productData = await apiService.getProductbyId(
      props.myProduct.productID
    );
    console.log(productData);
    //set my state
    setProductData(productData);
  };
  let cardSection =
    productData.length > 0 ? (
      <div>{productData[0].name}</div>
    ) : (
      <div>empty</div>
    );

  return (
    <div key={props.myProduct.productID}>
      <div>Product ID: {props.myProduct.productID}</div>
      <div>{cardSection}</div>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Typography component="legend">My Rating</Typography>
            <Rating
              id={"rating" + props.myProduct.productID}
              name={"name" + props.myProduct.productID}
              value={myrating}
              max={10}
              onChange={(event, newRating) => {
                setMyrating(newRating);
              }}
            />
          </Box>
        </FormControl>
        <FormControl>
          <TextField
            id={"note" + props.myProduct.productID}
            label="My Note"
            multiline
            rowsMax={10}
            value={mynote}
            onChange={(event) => {
              setMynote(event.target.value);
            }}
            variant="filled"
          />
        </FormControl>
        <Button type="submit" variant="contained">
          Save
        </Button>
        <Button onClick={handleDelete} variant="contained">
          Delete
        </Button>
      </form>
      {/* {props.user.name} */}
      {/* <SearchResults searchData={props.searchData} /> */}
    </div>
  );
}
