import React from "react";
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
//styles
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: theme.spacing(4),
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(props.result.id);
    if (props.user) {
      try {
        await userService.saveProduct(props.result);
        alert("product saved");
      } catch (err) {
        alert("Sorry, I am unable to save this");
      }
    } else {
      alert("Please signin first");
    }
  };
  // check if i am logged in --> then check if I saved this product
  // const alreadyFavorite = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let response = await userService.alreadyFavorite(props.result.id);
  //     return response;
  //   } catch (err) {
  //     alert("I cannot check if this is your fav");
  //     return false;
  //   }
  // };

  const alreadyFavorite = () => {
    if (props.user) {
      let response = userService.alreadyFavorite(props.result.id);
      return response;
    } else {
      return false;
    }
  };

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
          disabled={alreadyFavorite()}
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
          <Typography paragraph>
            Food Pairing:
            <div>
              {props.result.food_pairing.map((food, idx) => (
                <div key={idx}>{food}</div>
              ))}
            </div>
          </Typography>

          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default SearchResult;
