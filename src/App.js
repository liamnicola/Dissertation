import { initializeApp } from "firebase/app";

import React, {useEffect, useState} from "react";
import {
  Redirect,
  Switch,
  Route,
  useHistory,
  useLocation
} from "react-router-dom";
import useAuth from "./services/firebase/useAuth";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./config/globalStyles";
import theme from "./config/theme.js";
import firebaseConfig from "./config/firebase";
import Header from "./Components/Header";
import Landing from "./Views/Landing";
import Home from "./Views/Home";
import Login from "./Views/Login";
import Join from "./Views/Join";
import Create from "./Views/Create";
import Websites from "./Views/Websites";
import Website from "./Views/Website";
import background2 from "./assets/background2.png"


function Protected({ authenticated, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}


function App() {
  const location = useLocation();
  initializeApp(firebaseConfig);
  const history = useHistory();
  const [openMenu, setOpenMenu] = useState(true);
  const { isAuthenticated, createEmailUser, signInEmailUser, signUserOut } = useAuth();

  const handleMenuClick = (e) => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    setOpenMenu(false);
  }, [location]);


  useEffect(() => {
    if (isAuthenticated) {
      history.push("/home");
      return;
    }
    return;
  }, [isAuthenticated]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        
        <GlobalStyles />
        <div>
        {location.pathname !== "/join" && location.pathname !== "/login" && location.pathname !== "/" &&(
          <Header onClick={handleMenuClick} open={openMenu} signOut={signUserOut} />
        )}
        <Switch>
        <Protected authenticated={isAuthenticated} exact path="/home">
              <Home />
            </Protected>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/login">
            <Login authenticated={isAuthenticated} signInEmailUser={signInEmailUser} />
          </Route>
          <Route exact path="/join">
            <Join createEmailUser={createEmailUser}/>
          </Route>
            <Protected authenticated={isAuthenticated} exact path="/create">
              <Create />
            </Protected>
            <Protected authenticated={isAuthenticated} exact path="/websites">
              <Websites />
            </Protected>
            <Protected authenticated={isAuthenticated} exact path="/website/:id">
              <Website />
            </Protected>
          </Switch>
      </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
