import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { List, ListItem } from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { NavLink } from "react-router-dom";
import BuildIcon from "@material-ui/icons/Build";
import DashboardIcon from "@material-ui/icons/Dashboard";

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

  const drawer = (
    <div className={classes.list}>
      <List component='nav'>
        <ListItem
          color='inherit'
          to='/'
          component={NavLink}
          button
          onClick={() => props.setDrawerOpen(false)}
        >
          <HomeIcon className={classes.menuButton} />
          <Typography align='justify'>Home</Typography>
        </ListItem>
        <ListItem
          color='inherit'
          to='/dashboard'
          component={NavLink}
          button
          onClick={() => props.setDrawerOpen(false)}
        >
          <DashboardIcon className={classes.menuButton} />
          <Typography align='justify'>Dashboard</Typography>
        </ListItem>
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
        <ListItem
          color='inherit'
          to='/settings'
          component={NavLink}
          button
          onClick={() => props.setDrawerOpen(false)}
        >
          <BuildIcon className={classes.menuButton} />
          <Typography align='justify'>Settings</Typography>
        </ListItem>
      </List>
      <Divider />
      <List component='nav'>
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
