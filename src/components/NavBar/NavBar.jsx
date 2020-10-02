import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LocalBar from "@material-ui/icons/LocalBar";

import { Link } from "react-router-dom";

//style
const navFlexgrow = {
  flexGrow: 1,
};
const navLink = {
  textDecoration: "none",
  color: "#2f576e",
};
const navLogo = {
  textDecoration: "none",
  color: "white",
};

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));
//-------

const NavBar = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
  };

  let nav = props.user ? (
    <div>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <Link to="/favourites" style={navLink}>
          <MenuItem onClick={handleMenuClose}>FAVORITES</MenuItem>
        </Link>
        <Link to="" style={navLink} onClick={props.handleLogout}>
          <MenuItem onClick={handleMenuClose}>LOG OUT</MenuItem>
        </Link>
      </Menu>

      {/* &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <span className='NavBar-welcome'>WELCOME, {props.user.name}</span>  */}
    </div>
  ) : (
    <div>
      {/* <Link to={`products/${props.product.id}`} >save</Link> */}
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <Link to="/login" style={navLink}>
          <MenuItem onClick={handleMenuClose}>LOG IN</MenuItem>
        </Link>
        <Link to="/signup" style={navLink}>
          <MenuItem onClick={handleMenuClose}>SIGN UP</MenuItem>
        </Link>
      </Menu>
    </div>
  );

  return (
    <div style={navFlexgrow}>
      <AppBar position="static" style={{ background: "#2f576e" }}>
        <Toolbar>
          <Link
            to="/"
            style={navLogo}
            edge="start"
            className={classes.menuButton}
            color="inherit"
          >
            <LocalBar />
          </Link>
          <Link to="/" style={navLogo}>
            <Typography variant="h6" className={classes.title} noWrap>
              My Liquor Collection
            </Typography>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search your drink…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              name="searchInput"
              id="searchInput"
              onChange={props.handleinputChange}
              onKeyDown={props.handleKeyDown}
            />
          </div>
          {/* <div className="Navbar-flexgrow" /> */}
          <div style={navFlexgrow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="open drawer"
              aria-controls={menuId}
              // aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {nav}
    </div>
  );
};

export default NavBar;
