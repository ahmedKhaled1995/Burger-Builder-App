import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import BurgerBuilder from "../../../containers/BurgerBuilder/BurgerBuilder";
import * as actions from "../../../store/actions/index";

class Logout extends Component {
  componentDidMount = () => {
    this.props.logout();
  };

  render() {
    return <Redirect to={BurgerBuilder} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      return dispatch(actions.authLogOut());
    },
  };
};

export default connect(undefined, mapDispatchToProps)(Logout);
