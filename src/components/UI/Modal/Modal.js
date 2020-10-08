import React, { Component } from "react";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.css";

class Modal extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.isShown !== this.props.isShown ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    // Defining the modal style object
    const styleObj = {
      transform: this.props.isShown ? "translateY(0)" : "translateY(-100vh)",
      opacity: this.props.isShown ? "1" : "0",
    };

    return (
      <Aux>
        <Backdrop
          showBackdrop={this.props.isShown}
          backDropClicked={this.props.hideModal}
        />
        <div className={classes.Modal} style={styleObj}>
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
