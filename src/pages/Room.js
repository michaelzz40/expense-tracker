import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroupbyId, addNewMember, addExpense } from "../actions/groups";
import { GROUP_RESET } from "../actions/types";
import {
  Grid,
  Box,
  Typography,
  ListItem,
  ListItemText,
  List,
  ListSubheader,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  TextareaAutosize,
  DialogActions,
  DialogContent
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import {
  GROUP_LOADING,
  GROUP_SUCCESSFUL,
  GROUP_FAILED
} from "../actions/types";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(4, 0),
    padding: theme.spacing(2, 0)
  },
  memberList: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    height: 500,
    maxHeight: 700
  },
  description: {
    width: "100%",
    maxWidth: 640,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    height: 500,
    maxHeight: 700
  },
  listSection: {
    backgroundColor: "inherit"
  },
  modal: {
    padding: theme.spacing(4, 4),
    width: 400
  },
  textInput: {
    margin: theme.spacing(2, 0),
    width: "100%"
  },
  button: {
    width: "50%"
  }
}));

const Room = props => {
  const [openMember, setOpenMember] = useState(false);
  const [expense, setExpense] = useState(0);
  const [description, setDescription] = useState("");
  const [openExpense, setOpenExpense] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { group, groupFailedMessage } = useSelector(state => state.groups);
  const { token, email, userId } = useSelector(state => state.auth);
  const [member, setMember] = useState("");
  useEffect(() => {
    if (groupFailedMessage === "401") {
      dispatch({ type: GROUP_RESET });
      props.history.push("/group");
    }
    if (token) {
      dispatch(getGroupbyId(props.match.params.groupId));
    }
  }, [token, dispatch, groupFailedMessage]);

  const handleOpen = () => {
    setOpenMember(true);
  };

  const handleClose = () => {
    setOpenMember(false);
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(addNewMember(member, props.match.params.groupId));
    setOpenMember(false);
  };

  const generateReport = async () => {
    try {
      dispatch({ type: GROUP_LOADING });
      const response = await axios.post(
        `https://josaphat.herokuapp.com/api/generate_expense?email=${email}&groupId=${props.match.params.groupId}`
      );
      console.log(response);
      dispatch({ type: GROUP_SUCCESSFUL });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: GROUP_FAILED });
    }
  };

  const addExpenses = e => {
    e.preventDefault();
    dispatch(
      addExpense(expense, props.match.params.groupId, userId, description)
    );
  };

  return (
    <>
      <Dialog
        open={openExpense}
        onClose={() => setOpenExpense(false)}
        aria-labelledby='form-dialog-title'
      >
        <form onSubmit={addExpenses}>
          <DialogTitle id='form-dialog-title'>Add Expense</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Amount'
              type='number'
              fullWidth
              value={expense}
              onChange={e => setExpense(e.target.value)}
            />
            <TextareaAutosize
              rowsMin={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenExpense(false)} color='primary'>
              Cancel
            </Button>
            <Button
              onClick={() => setOpenExpense(false)}
              color='primary'
              type='submit'
            >
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        onClose={handleClose}
        aria-labelledby='simple-dialog-title'
        open={openMember}
      >
        <Grid container spacing={2}>
          <form
            noValidate
            autoComplete='off'
            onSubmit={submitHandler}
            className={classes.modal}
          >
            <Typography variant='h6' id='simple-dialog-title'>
              Add New Member
            </Typography>
            <Grid item xs={12} md={12}>
              <TextField
                className={classes.textInput}
                value={member}
                onChange={e => setMember(e.target.value)}
                label='Member'
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Button
                variant='outlined'
                color='primary'
                className={classes.button}
                type='submit'
              >
                Add
              </Button>
            </Grid>
          </form>
        </Grid>
      </Dialog>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={4} md={2}>
          <Button variant='outlined' onClick={handleOpen}>
            ADD NEW MEMBER
          </Button>
        </Grid>
        <Grid item xs={4} md={6}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setOpenExpense(true)}
          >
            ADD EXPENSE
          </Button>
        </Grid>
        <Grid item xs={4} md={4}>
          <Button
            variant='contained'
            color='secondary'
            onClick={generateReport}
          >
            GENERATE REPORT
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <List className={classes.memberList} subheader={<li />}>
            <ListSubheader>Member List</ListSubheader>
            {group
              ? group.map(g => (
                  <li key={g.userId} className={classes.listSection}>
                    <ul className={classes.ul}>
                      <ListItem>
                        <ListItemText
                          primary={g.user.firstName + " " + g.user.lastName}
                          secondary={g.user.email}
                        />
                      </ListItem>
                    </ul>
                  </li>
                ))
              : null}
          </List>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid className={classes.description}></Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Room;
