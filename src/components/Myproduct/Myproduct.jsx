import React, { useEffect } from "react";
import {
  FormControl,
  Input,
  InputLabel,
  Button,
  Box,
  Typography,
  TextField,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import clsx from "clsx";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import EditIcon from "@material-ui/icons/Edit";

import userService from "../../utils/userService";
import { Link } from "react-router-dom";
import apiService from "../../utils/apiService";

//styles-------------
const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345, //css--------
    margin: theme.spacing(4),
  },
  //css--------
  title: {
    display: "flex",
  },
  //css---------
  media: {
    // height: 0,
    // paddingTop: "56.25%", // 16:9
    height: 300,
    width: "100%",
    objectFit: "fit",
    // paddingBottom: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  // avatar: {
  //   backgroundColor: red[500],
  // },
}));
//------------------

export default function Myproduct(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const [myrating, setMyrating] = React.useState(props.myProduct.myrating);
  const [mynote, setMynote] = React.useState(props.myProduct.mynote);
  const [productData, setProductData] = React.useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
    if (props.productLocation == "apiProduct") {
      try {
        await userService.updateMyProduct(props.myProduct._id, myProductInfo);
      } catch (err) {
        alert(err);
      }
    } else if (props.productLocation == "localProduct") {
      try {
        await userService.updateMylocalProduct(
          props.myProduct._id,
          myProductInfo
        );
      } catch (err) {
        alert(err);
      }
      props.handleUpdateMyProducts(props.productLocation);
    }

    // need to add handleUpdateMyProducts
    //update state
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log("i am in myproduct handleDelete");
    try {
      await userService.deleteMyProduct(props.myProduct._id);
      props.handleUpdateMyProducts(props.productLocation);
      alert("product deleted");
    } catch (err) {
      alert(err);
    }
  };

  const fetchLocalProductInfo = () => {
    let dataArry = [];
    console.log("fetching data");
    // for (let i = 0; i < props.localProducts.length; i++) {
    //   if ((props.localProducts[i]._id = props.myProduct.productID)) {
    //     const productData = props.localProducts[i];
    //     // console.log("productData=" + productData.name);
    //     // setProductData(productData);
    //     return productData;
    //   }
    // }
    const productData = props.localProducts.find(
      (x) => x._id == props.myProduct.productID
    );
    dataArry.push(productData);
    return dataArry;
  };

  //on mount fetch product info
  useEffect(() => {
    //   await fetchProductInfo();
    if (props.productLocation == "apiProduct") {
      const fetchData = async () => {
        const productData = await apiService.getProductbyId(
          props.myProduct.productID
        );
        console.log("apiproductData[0]=" + productData[0].name);
        //set my state
        setProductData(productData);
      };
      fetchData();
    } else if (props.productLocation == "localProduct") {
      //find it in the localProducts state
      const fetchData = async () => {
        let dataArry = [];
        const productData = await fetchLocalProductInfo();

        console.log("localproductData=" + productData[0].name);
        setProductData(productData);
      };
      fetchData();

      // for (let i = 0; i < props.localProducts.length; i++) {
      //   if ((props.localProducts[i]._id = props.myProduct.productID)) {
      //     const productData = props.localProducts[i];
      //     console.log("productData=" + productData.name);
      //     setProductData(productData);
      //   }
      // }
    }
  }, []);

  const fetchProductInfo = async (e) => {
    const productData = await apiService.getProductbyId(
      props.myProduct.productID
    );
    console.log("productData=" + productData);
    //set my state
    setProductData(productData);
  };

  return (
    <div key={props.myProduct.productID}>
      {/* <div>Product ID: {props.myProduct.productID}</div> */}
      {productData.length > 0 && (
        // <div>{productData[0].name}</div>
        <Card key={productData[0].id} className={classes.root}>
          <div className={classes.title}>
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            {/* <img src={props.result.image_url} /> */}
            {props.productLocation == "apiProduct" ? (
              <CardMedia
                className={classes.media}
                image={productData[0].image_url}
                title={productData[0].name}
              />
            ) : (
              <CardMedia
                className={classes.media}
                image={productData[0].img_url}
                title={productData[0].name}
              />
            )}
            <CardContent>
              <Typography variant="h6">{productData[0].name}</Typography>
              <Typography variant="subtitle1">
                {productData[0].tagline}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                paragraph
              >
                {productData[0].description}
              </Typography>
              <Typography variant="caption" paragraph>
                ABV: {productData[0].abv}%
              </Typography>
              <Typography variant="caption" paragraph>
                IBU: {productData[0].ibu}
              </Typography>
              <Typography variant="caption" paragraph>
                Food Pairing
              </Typography>
              <Typography variant="caption">
                {productData[0].food_pairing &&
                  productData[0].food_pairing.map((food, idx) => (
                    <p key={idx}>{food}</p>
                  ))}
              </Typography>
            </CardContent>
          </div>
          <CardActions disableSpacing>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              {/* <ExpandMoreIcon /> */}
              <EditIcon />
            </IconButton>
          </CardActions>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
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
            </CardContent>
          </Collapse>
        </Card>
      )}
      {/* <form onSubmit={handleSubmit}>
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
      </form> */}
      {/* {props.user.name} */}
      {/* <SearchResults searchData={props.searchData} /> */}
    </div>
  );
}
