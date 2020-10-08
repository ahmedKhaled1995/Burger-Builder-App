/* So I guess German people call Nanbar a Toolbar */

import React from "react";

import NavigationItems from "../Navigation/NavigationItems/NavigationItems";
import Logo from "../Logo/Logo";
import HamburgerIcon from "../Navigation/SideDrawer/HamburgerIcon/HamburgerIcon";
import classes from "./Toolbar.css";

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      {/* <div onClick={props.hamburgerMenuClicked}>Menu</div> */}
      <HamburgerIcon hamIconClicked={props.hamburgerMenuClicked} />
      <Logo logoHeight="80%" />
      <nav className={classes.HideOnMobile}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolbar;
