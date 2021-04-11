import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useDispatch } from "react-redux";

// AUTHENTICATION:
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// CUSTOM COMPONENTS:
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import AboutPage from "../AboutPage/AboutPage";
import Message from "../MessageAll/MessageAll";
import UserPage from "../UserPage/UserPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import DiscoverPage from "../DiscoverPage/DiscoverPage";
import SearchNetwork from "../SearchNetwork/SearchNetwork";
import StyleGuide from '../StyleGuide/StyleGuide';

import RegisterVendorPage from '../RegisterPage/VendorRegisterPage';

import "./App.css";

// Material-UI:
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  Button, // replaces html5 <button> element
  ButtonGroup,
  FormControl,
  FormHelperText,
  Grid, //
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography, // replace html5 elements dealing with text, <h1>, <h2>, <h3>, <p>, etc...

} from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    background: {
      paper: "#fff",
      default: "#fff",
      level2: "#f5f5f5",
      level1: "#fff"
    },
    secondary: {
      light: '#fffff9',
      main: '#fefcc6',
      dark: '#cac995',
      contrastText: '#000000',
    },
    primary: {
      light: '#cd7c50',
      main: '#984f26',
      dark: '#652500',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Forum',
      'Raleway'
    ].join(','),
  },
});


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/message" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage theme={theme} />
            </Route>

            {/* Visiting localhost:3000/styleGuide will show the styleGuide used for this page.
            This route should be removed/inaccessible by users for production.*/}
            <Route
              // shows the StyleGuide for this Project
              exact
              path="/styleGuide"
            >
              <StyleGuide />
            </Route>

            <Route exact path="/message">
              <Message theme={theme} />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              <UserPage theme={theme} />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows Discover else shows LoginPage
              exact
              path="/discover"
            >
              <DiscoverPage theme={theme} />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows Discover else shows LoginPage
              exact
              path="/search"
            >
              <SearchNetwork theme={theme} />
            </ProtectedRoute>

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              authRedirect="/user"
            >
              <LoginPage theme={theme} />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              authRedirect="/user"
            >
              <RegisterPage theme={theme} />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/vendor"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration/vendor"
              authRedirect="/vendor"
            >
              <RegisterVendorPage theme={theme} />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              authRedirect="/user"
            >
              <LandingPage theme={theme} />
            </ProtectedRoute>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer theme={theme} />
          <Nav theme={theme} />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
