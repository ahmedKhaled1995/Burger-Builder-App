import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import asyncComponent from "./components/hoc/asyncComponent/asyncComponent";
import Layout from "./components/hoc/Layout/Layout";
import * as actions from "./store/actions/index";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Auth from "./containers/Auth/Auth";
/*
// The following imports will be loaded using lazy loading
import Checkout from "./containers/Ckeckout/Checkout";
import Orders from "./containers/Orders/Orders";
import Logout from "./containers/Auth/Logout/Logout";
*/

// Preparing routes components using lazy loading
const CheckoutAsync = asyncComponent(() => {
  return import("./containers/Ckeckout/Checkout");
});
const OrdersAsync = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});
const LogoutAsync = asyncComponent(() => {
  return import("./containers/Auth/Logout/Logout");
});

class App extends Component {
  // Used to check the authentication when the user visits the site
  componentDidMount = () => {
    this.props.checkAuthStatus();
  };

  render() {
    // Adding guard to our routes
    let routes = (
      <Switch>
        {/* BurgerBuilder Component */}
        <Route path="/" exact component={BurgerBuilder} />
        {/* Auth Component */}
        <Route path="/auth" component={Auth} />
        {/* Hanle all cases */}
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.token) {
      routes = (
        <Switch>
          {/* BurgerBuilder Component */}
          <Route path="/" exact component={BurgerBuilder} />
          {/*  Checkout component */}
          <Route path="/check-out" component={CheckoutAsync} />
          {/*  Oreders component */}
          <Route path="/orders" component={OrdersAsync} />
          {/* Logout Component, there is nothing to display in it, all it does is dispatch logout action and redirects them to the main page */}
          <Route path="/logout" component={LogoutAsync} />
          {/* Auth Component, even though we don't need it here, we add it because there's code inside it that we want to excute when the user is
            authenticated, if we don't include it that route, that code will never be excuted */}
          <Route path="/auth" component={Auth} />
          {/* Hanle all cases */}
          <Redirect to="/" />
        </Switch>
      );
    }
    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthStatus: () => {
      dispatch(actions.checkAuthState());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
