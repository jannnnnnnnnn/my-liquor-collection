import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  Input,
  InputLabel,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Select,
  MenuItem,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import productService from "../../utils/productService";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderStyle: "groove",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  detailSection: {
    align: "center",
  },
  multilineText: {
    width: "40ch",
    minHeight: "100px",
  },
}));

export default function ProductForm(props) {
  const classes = useStyles();
  const initialState = {
    name: "",
    liquor_type: "",
    manufacture: "",
    description: "",
    img_url: "",
    abv: 0,
    ibu: 0,
  };
  const [productInfo, setProductInfo] = React.useState(initialState);

  // const [productInfo, setProductInfo] = React.useState({
  //   name: "",
  //   liquor_type: "",
  //   manufacture: "",
  //   description: "",
  //   img_url: "",
  //   abv: 0,
  //   ibu: 0,
  // });
  const [foods, setFoods] = React.useState({
    Chicken: false,
    Fish: false,
    Beef: false,
  });
  const clearState = () => {
    console.log("i am in clearning state");
    setProductInfo({ ...initialState });
    setFoods({ Chicken: false, Fish: false, Beef: false });
  };
  const handleFoodsChange = async (event) => {
    setFoods({ ...foods, [event.target.name]: event.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("i am in myproduct handleSubmit");
    let food_pairing = Object.keys(foods).filter((k) => foods[k]);
    let productData = { ...productInfo, food_pairing };
    console.log(productData);
    if (props.user) {
      try {
        await productService.create(productData);
        props.retriveAllLocalProducts();
        props.retrivemyProducts();
        clearState();
        // props.history.push("/favourites");
        props.changeAlertMsg("success", "Product Saved Successfully");

        // alert("Product saved");
        // props.history.push("/favourites");

        //add to front end
      } catch (err) {
        alert(err);
      }
    } else {
      props.changeAlertMsg("info", "Please signin first");

      // alert("Please signin first");
    }
    // need to add handleUpdateMyProducts
    //update state
  };

  const handleChange = (e) => {
    let eventInput = e.target;
    setProductInfo((prev) => {
      return {
        ...prev,
        [eventInput.name]: eventInput.value,
      };
    });
  };

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" className={classes.heading}>
            Add a Product
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit} className={classes.detailSection}>
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={productInfo.name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="manufacture">Manufacture</InputLabel>
                <Input
                  id="manufacture"
                  name="manufacture"
                  type="text"
                  value={productInfo.manufacture}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="img_url">Image URL</InputLabel>
                <Input
                  id="img_url"
                  name="img_url"
                  type="url"
                  value={productInfo.img_url}
                  onChange={handleChange}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel id="simple-select-label">Liquor Type</InputLabel>
                <Select
                  labelId="simple-select-label"
                  id="simple-select"
                  name="liquor_type"
                  value={productInfo.liquor_type}
                  onChange={handleChange}
                >
                  <MenuItem value={"beer"}>Beer</MenuItem>
                  <MenuItem value={"wine"}>Wine</MenuItem>
                  <MenuItem value={"others"}>Others</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="abv">ABV %</InputLabel>
                <Input
                  id="abv"
                  name="abv"
                  type="number"
                  value={productInfo.abv}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="ibu">IBU</InputLabel>
                <Input
                  id="ibu"
                  name="ibu"
                  type="number"
                  value={productInfo.ibu}
                  onChange={handleChange}
                />
              </FormControl>
            </div>
            <div>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Food Pairing</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={foods.Chicken}
                        onChange={handleFoodsChange}
                        name="Chicken"
                      />
                    }
                    label="Chicken"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={foods.Fish}
                        onChange={handleFoodsChange}
                        name="Fish"
                      />
                    }
                    label="Fish"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={foods.Beef}
                        onChange={handleFoodsChange}
                        name="Beef"
                      />
                    }
                    label="Beef"
                  />
                </FormGroup>
              </FormControl>
              <FormControl className={classes.multilineText}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Description"
                  name="description"
                  multiline
                  rowsMax={10}
                  value={productInfo.description}
                  variant="outlined"
                  onChange={handleChange}
                />
              </FormControl>
            </div>
            <Button style={{ width: "100%" }} type="submit" variant="contained">
              Save
            </Button>
          </form>
        </AccordionDetails>
      </Accordion>
      {/* <SearchResults searchData={props.searchData} /> */}
    </div>
  );
}
