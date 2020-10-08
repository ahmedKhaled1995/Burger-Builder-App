import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

const sideDrawer = (props) => {
  // Forming the classes that will be added to SideDrawer to determine wether it's visible or not
  let isOpen = props.show ? classes.Open : classes.Close;
  let sideBarCssClasses = `${classes.SideDrawer} ${isOpen}`;

  return (
    <Aux>
      <Backdrop showBackdrop={props.show} backDropClicked={props.clicked} />
      <div className={sideBarCssClasses}>
        <Logo logoHeight="11%" mb="32px" />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
