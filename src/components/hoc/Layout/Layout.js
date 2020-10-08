import React, { Component } from "react";

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
      <React.Fragment>
        {/* <div>Toolbar, SideDrawer, Backdrop</div> */}
        <Toolbar hamburgerMenuClicked={this.openSideDrawerHandler} />
        <SideDrawer
          show={this.state.showSideDrawer}
          clicked={this.closeSideDrawerHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;
