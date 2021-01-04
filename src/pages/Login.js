import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { NavLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp";
import { logUser } from "../actions/userAuth";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_RESET } from "../actions/types";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const images = [
  "https://miro.medium.com/max/8000/1*JrHDbEdqGsVfnBYtxOitcw.jpeg",
  "https://www.business.com/images/content/5e8/34b6c9c658a396c8b456b/1500-0-",
  "https://blog.hubspot.com/hubfs/business-plan-1.jpg",
  "https://images.cnbctv18.com/wp-content/uploads/2020/03/aerial-background-beverage-blog-blogger-browsing-1436001-pxhere.com-1-768x432.jpg"
];

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: `url(${images[Math.floor(Math.random() * 3)]})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  arrow: {
    margin: theme.spacing(2, 4)
  },
  paper: {
    margin: theme.spacing(4, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
export default function Login(props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  const { token, errorMessage } = useSelector(state => state.auth);

  useEffect(() => {
    if (token) {
      props.history.push("/group");
    }
    if (errorMessage) {
      setOpen(true);
    }
  }, [token, errorMessage]);

  const submitForm = e => {
    e.preventDefault();
    const form = {
      email,
      password
    };
    dispatch(logUser(form));
    props.history.push("/group");
  };

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          dispatch({ type: AUTH_RESET });
          setOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            dispatch({ type: AUTH_RESET });
            setOpen(false);
          }}
          severity='error'
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.arrow}>
          <IconButton component={NavLink} to='/'>
            <ArrowBackIosSharpIcon color='primary' />
          </IconButton>
        </div>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={submitForm}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              value={password}
              autoComplete='current-password'
              onChange={e => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link component={NavLink} to='/register' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
