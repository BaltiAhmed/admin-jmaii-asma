import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBFooter,
  MDBNavLink,
  MDBTooltip,
  MDBIcon,
} from "mdbreact";
import { ReactComponent as Logo } from "./assets/logo.svg";
import Routes from "./Routes";
import { Route, BrowserRouter } from "react-router-dom";
import { UserAuth } from "./hooks/auth";
import { Authcontext } from "./context/auth-context";
import Login from "./views/login";
import NavBar from "./components/nav-bar";
import ChartsPage from "./views/chart";
import ListEntreprise from "./views/entreprise/list";
import ListOffre from "./views/entreprise/offre";
import ListCondidat from "./views/condidat/list";
import CV from "./views/condidat/cv";


function App() {
  const { userId, token, login, logout, user } = UserAuth();

  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route exact path="/" component={ChartsPage} />
        <Route exact path="/entreprise" component={ListEntreprise} />
        <Route exact path="/List-offre/:id" component={ListOffre} />
        <Route exact path="/condidat" component={ListCondidat} />
        <Route exact path="/cv/:id" component={CV} />
        

      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route exact path="/" component={Login} />
      </React.Fragment>
    );
  }

  return (
    <Authcontext.Provider
      value={{
        userId: userId,
        token: token,
        login: login,
        logout: logout,
        user: user,
      }}
    >
      <BrowserRouter>
        {!token ? <Login /> : <NavBar content={routes} />}
      </BrowserRouter>
    </Authcontext.Provider>
  );
}

export default App;
