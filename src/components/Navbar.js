import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "@material-ui/core/Link";
import PersonIcon from "@material-ui/icons/Person";
import { NavLink } from "react-router-dom";
import SideDrawer from "./SideDrawer";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../actions/settings";
import { withStyles } from "@material-ui/core/styles";
import { FormControlLabel, Switch } from "@material-ui/core";
import { AUTH_RESET } from "../actions/types";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    margin: theme.spacing(0, 2),
    [theme.breakpoints.down("xs")]: {
      display: "none",
      padding: theme.spacing(2, 2)
    }
  },
  title: {
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  hamburger: {
    margin: theme.spacing(0, 2)
  },
  toggle: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto"
    }
  },
  username: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  }
}));

const ToggleSwitch = withStyles({
  switchBase: {
    color: "#e0e0e0",
    "&$checked": {
      color: "#212121"
    },
    "&$checked + $track": {
      backgroundColor: "#757575"
    }
  },
  checked: {},
  track: {}
})(Switch);

const Navbar = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector(state => state.settings);
  const { username, token } = useSelector(state => state.auth);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const classes = useStyles();

  function handleDrawerToggle() {
    setDrawerOpen(!drawerOpen);
  }

  const changeThemes = () => {
    if (mode === true) {
      dispatch(changeTheme("dark"));
    } else {
      dispatch(changeTheme("light"));
    }
  };

  return (
    <AppBar position='static' color='default'>
      <SideDrawer
        handleDrawerToggle={handleDrawerToggle}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
      <Toolbar>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='menu'
          className={classes.hamburger}
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant='h6' className={classes.title}>
          <Link component={NavLink} to='/' underline='none' color='inherit'>
            Expense Tracker
          </Link>
        </Typography>
        <FormControlLabel
          className={classes.toggle}
          control={
            <ToggleSwitch
              checked={mode}
              onChange={changeThemes}
              name='checkedA'
            />
          }
        />
        {token ? (
          <>
            <Typography className={classes.username}>{username}</Typography>
            <Button
              color='primary'
              variant='contained'
              component={NavLink}
              to='/login'
              className={classes.menuButton}
              onClick={() => {
                localStorage.removeItem("token");
                dispatch({ type: AUTH_RESET });
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color='inherit' component={NavLink} to='/login'>
              <PersonIcon className={classes.menuButton} />
              Login
            </Button>
            <Button
              color='inherit'
              component={NavLink}
              to='/register'
              className={classes.menuButton}
            >
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
