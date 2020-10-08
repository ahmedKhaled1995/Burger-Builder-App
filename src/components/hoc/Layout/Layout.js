import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import classes from "./Layout.css";
import Toolbar from "../../UI/Toolbar/Toolbar";
import SideDrawer from "../../UI/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  closeSideDrawerHandler = () => {
    this.setState({
      showSideDrawer: false,
    });
  };

  openSideDrawerHandler = () => {
    this.setState({
      showSideDrawer: true,
    });
  };

  render() {
    return (
      <BrowserRouter>
        {/* <div>Toolbar, SideDrawer, Backdrop</div> */}
        <Toolbar hamburgerMenuClicked={this.openSideDrawerHandler} />
        <SideDrawer
          show={this.state.showSideDrawer}
          clicked={this.closeSideDrawerHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </BrowserRouter>
    );
  }
}

export default Layout;
