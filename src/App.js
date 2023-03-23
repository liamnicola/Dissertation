import React, {useEffect, useState} from "react";
import {
  Switch,
  Route,
  useLocation,
  useHistory,
  Redirect,
} from "react-router-dom";
import useAuth from "./services/firebase/useAuth";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./config/globalStyles";
import theme from "./config/theme.js";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./config/firebase";
import Header from "./Components/Header";
import Landing from "./Views/Landing";
import Home from "./Views/Home";
import Login from "./Views/Login";
import Join from "./Views/Join";
import Create from "./Views/Create";
import Websites from "./Views/Websites";
import Website from "./Views/Website";
import SingleWebsite from "./Components/SingleWebsite";

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
  const history = useHistory();
  initializeApp(firebaseConfig);
  const [openMenu, setOpenMenu] = useState(false);
  const { isAuthenticated, createEmailUser, signInEmailUser, signUserOut } =
  useAuth();
useEffect(() => {
  if (isAuthenticated) {
    history.push("/Home");
  }
  return;
}, [isAuthenticated]);


  const handleMenuClick = (e) => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    setOpenMenu(false);
  }, [location]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        
        <GlobalStyles />
        <div>
        {location.pathname !== "/join" && location.pathname !== "/login" && location.pathname !== "/" &&(
          <Header onClick={handleMenuClick} open={openMenu} signOut={signUserOut} />
        )}
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/Login">
            <Login signInEmailUser={signInEmailUser} />
          </Route>
          <Route exact path="/join">
            <Join createEmailUser={createEmailUser}/>
          </Route>
          <Switch>
          <Protected authenticated={isAuthenticated} exact path="/Home">
              <Home />
            </Protected>
            <Protected authenticated={isAuthenticated} exact path="/Create">
              <Create />
            </Protected>
            <Protected authenticated={isAuthenticated} exact path="/Websites">
              <Websites />
            </Protected>
            <Protected authenticated={isAuthenticated} exact path="/website/:id">
              <SingleWebsite />
            </Protected>
          </Switch>
      </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
