import React, { useEffect } from "react";
//styles
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import userService from "../../utils/userService";
//styles------------
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: theme.spacing(4),
    height: "100%",
  },
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
  avatar: {
    backgroundColor: red[500],
  },
}));
//------------------

const SearchResult = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [checkFav, setCheckFav] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(props.result.id);
    if (props.user) {
      try {
        await userService.createMyProduct(props.result);
        props.handleUpdateMyProducts("apiProduct");
        setCheckFav(true);
        props.changeAlertMsg("success", "Product Saved Successfully");
        // alert("product saved");
      } catch (err) {
        props.changeAlertMsg("warning", "Sorry, I am unable to save this");

        // alert("Sorry, I am unable to save this");
      }
    } else {
      props.changeAlertMsg("info", "Please Sign in First");

      // alert("Please signin first");
    }
  };

  const alreadyFavorite = () => {
    if (props.user) {
      let check = false;
      props.myProducts.forEach((myProduct) => {
        if (myProduct.productID == props.result.id) {
          check = true;
        }
      });
      setCheckFav(check);
    } else {
      return false;
    }
  };

  useEffect(() => {
    alreadyFavorite();
  }, []);

  return (
    <Card key={props.result.id} className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.result.name}
        subheader={props.result.tagline}
      />
      {/* <img src={props.result.image_url} /> */}
      <CardMedia
        className={classes.media}
        image={props.result.image_url}
        title={props.result.name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.result.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={handleSubmit}
          aria-label="add to favorites"
          disabled={checkFav}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>ABV: {props.result.abv}%</Typography>
          <Typography paragraph>IBU: {props.result.ibu}</Typography>
          <Typography paragraph>Food Pairing</Typography>
          <Typography paragraph>
            {props.result.food_pairing.map((food, idx) => (
              <div key={idx}>{food}</div>
            ))}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default SearchResult;
