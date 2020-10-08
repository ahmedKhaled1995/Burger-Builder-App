import React, { Component } from "react";

import classes from "./Input.css";

class Input extends Component {
  render() {
    // Determining the type of the input Element
    let inputElement = null;
    switch (this.props.elementType) {
      case "input":
        inputElement = (
          <input
            {...this.props.elementConfig}
            value={this.props.value}
            onChange={this.props.changeHandler}
            onFocus={this.props.focusIn}
            onBlur={this.props.focusOut}
            className={classes[this.props.backGroundColor]}
          />
        );
        break;
      case "textarea":
        inputElement = (
          <textarea
            {...this.props.elementConfig}
            value={this.props.value}
            onChange={this.props.changeHandler}
          />
        );
        break;
      case "select":
        let options = [];
        // selected={key === props.value}
        for (let key in this.props.elementConfig) {
          options.push(
            <option value={key} key={key}>
              {this.props.elementConfig[key]}
            </option>
          );
        }
        inputElement = (
          <select
            onChange={this.props.changeHandler}
            defaultValue={this.props.value}
          >
            {options}
          </select>
        );
        break;
      default:
        inputElement = <input {...this.props.elementConfig} />;
    }

    // Returning the JSX element
    return (
      <div className={`${classes.InputElement}`}>
        {inputElement}
        <p>{this.props.errorText}</p>
      </div>
    );
  }
}

export default Input;
