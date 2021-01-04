import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { List, ListItem } from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BuildIcon from "@material-ui/icons/Build";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { AUTH_RESET } from "../actions/types";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  flex: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh"
  }
}));

const SideDrawer = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { token, username } = useSelector(state => state.auth);

  const drawer = (
    <div className={classes.list}>
      <List component='nav'>
        <ListItem
          color='inherit'
          to='/group'
          component={NavLink}
          button
          onClick={() => props.setDrawerOpen(false)}
        >
          <GroupIcon className={classes.menuButton} />
          <Typography align='justify'>Groups</Typography>
        </ListItem>
      </List>
      <Divider />
      <List component='nav'>
        {token ? (
          <>
            <ListItem>{username}</ListItem>
            <ListItem
              button
              onClick={() => {
                dispatch({ type: AUTH_RESET });
                props.setDrawerOpen(false);
              }}
            >
              Logout
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              component={NavLink}
              to='/login'
              button
              onClick={() => props.setDrawerOpen(false)}
            >
              Login
            </ListItem>
            <ListItem
              component={NavLink}
              to='/register'
              button
              onClick={() => props.setDrawerOpen(false)}
            >
              Register
            </ListItem>
          </>
        )}
      </List>
    </div>
  );

  return (
    <SwipeableDrawer
      anchor='left'
      open={props.drawerOpen}
      onClose={props.handleDrawerToggle}
      onOpen={props.handleDrawerToggle}
    >
      {drawer}
    </SwipeableDrawer>
  );
};

export default SideDrawer;
