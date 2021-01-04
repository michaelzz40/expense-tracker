import "./App.css";
import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { Switch, Route, Redirect } from "react-router";
import Register from "./pages/Register";
import Room from "./pages/Room";
import Group from "./pages/Group";
import { useDispatch, useSelector } from "react-redux";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import {
  orange,
  deepOrange,
  deepPurple,
  lightBlue
} from "@material-ui/core/colors";
import LinearProgress from "@material-ui/core/LinearProgress";
import { attachToken } from "./actions/userAuth";

function App() {
  const { mode } = useSelector(state => state.settings);
  const dispatch = useDispatch();
  const { authLoading } = useSelector(state => state.auth);
  const { groupLoading } = useSelector(state => state.groups);

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: orange[500]
      },
      secondary: {
        main: deepOrange[900]
      },
      background: {
        default: "#222222"
      }
    }
  });
  const lightTheme = createMuiTheme({
    palette: {
      type: "light",
      primary: {
        main: lightBlue[500]
      },
      secondary: {
        main: deepPurple[500]
      },
      background: {
        default: "rgba(0, 0, 0, 0.04)"
      }
    }
  });

  useEffect(() => {
    dispatch(attachToken());
  }, [dispatch]);

  return (
    <ThemeProvider theme={mode ? lightTheme : darkTheme}>
      <CssBaseline />
      <div className='App'>
        <Navbar />
        {authLoading || groupLoading ? <LinearProgress /> : null}
        <Container fluid='true'>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/group/:groupId' component={Room} exact={true} />
            <Route path='/group' component={Group} exact={true} />
            <Redirect to='/group' />
          </Switch>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
