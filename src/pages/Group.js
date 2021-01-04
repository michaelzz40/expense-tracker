import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Typography,
  List,
  ListItem,
  Avatar,
  ListItemText,
  ListItemAvatar,
  Box,
  Button,
  TextField,
  Link,
  Snackbar
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { getAllGroups, createGroup } from "../actions/groups";
import MuiAlert from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { NavLink } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles(theme => ({
  form: {
    width: "90%",
    margin: theme.spacing(2, 0)
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  },
  button: {
    margin: theme.spacing(0, 0, 0, 2)
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 4),
    width: "30%"
  },
  modalTitle: {
    marginTop: 0
  }
}));

const Group = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const { groups, groupFailedMessage } = useSelector(state => state.groups);
  const { token } = useSelector(state => state.auth);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    if (groupFailedMessage) {
      setErrorOpen(true);
    }
    if (!token) {
      props.history.push("/login");
    }
    if (token) {
      dispatch(getAllGroups());
    }
  }, [dispatch, groupFailedMessage, token]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = async e => {
    e.preventDefault();
    await dispatch(createGroup(companyName));
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={() => setErrorOpen(false)}
      >
        <Alert onClose={() => setErrorOpen(false)} severity='error'>
          {groupFailedMessage ? groupFailedMessage : null}
        </Alert>
      </Snackbar>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form>
              <h2 className={classes.modalTitle}>CREATE NEW GROUP</h2>
              <Grid item xs={12} md={12} className={classes.form}>
                <TextField
                  autoComplete='fname'
                  name='firstName'
                  variant='outlined'
                  fullWidth
                  id='firstName'
                  label='Company Name'
                  autoFocus
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                />
              </Grid>
              <Button
                onClick={submitHandler}
                color='primary'
                variant='outlined'
                startIcon={<AddIcon />}
              >
                CREATE
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
      <Grid container className={classes.title}>
        <Grid item xs={12} md={7}>
          <Typography variant='h6'>Your Groups:</Typography>
        </Grid>
        <Grid item xs={12} md={5} align='end'>
          <Button
            variant='outlined'
            color='primary'
            startIcon={<AddIcon />}
            className={classes.button}
            onClick={handleOpen}
          >
            Add new
          </Button>
          <Button
            variant='contained'
            startIcon={<RemoveIcon />}
            color='secondary'
            className={classes.button}
          >
            Remove Group
          </Button>
        </Grid>
      </Grid>
      <Grid container mt={2}>
        {groups
          ? groups.map(group => {
              return (
                <Grid item xs={12} key={group.group.groupId}>
                  <Link
                    component={NavLink}
                    underline='none'
                    color='inherit'
                    to={`/group/${group.groupId}`}
                  >
                    <Box p={1} mt={2} boxShadow={2}>
                      <div className={classes.demo}>
                        <List>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <PeopleAltIcon color='secondary' />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={group.group.companyName} />

                            {`Total Expense: ${group.group.totalExpense}`}
                          </ListItem>
                        </List>
                      </div>
                    </Box>
                  </Link>
                </Grid>
              );
            })
          : null}
      </Grid>
    </div>
  );
};

export default Group;
