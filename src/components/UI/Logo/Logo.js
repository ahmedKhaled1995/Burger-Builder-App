import React from "react";

import classes from "./Logo.css";
/* Note how I imported the img like how I import css files, ofcourse the img will not be in the javascript code,
it just has to do with how webpack works, if i directly use the img's path in the src attribute, webpack will not be aware of it
in production and will not be in our project final folder (agter building)m so we import the img to make webpack aware of its location
*/
import logoImg from "../../../assets/images/logo.png";

const logo = (props) => {
  return (
    <div
      className={classes.Logo}
      style={{ height: props.logoHeight, marginBottom: props.mb }}
    >
      <img src={logoImg} alt="BurgerBuilder-Logo"></img>
    </div>
  );
};

export default logo;
