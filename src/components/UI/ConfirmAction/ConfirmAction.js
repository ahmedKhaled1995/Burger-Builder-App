import React from "react";

import classes from "./ConfirmAction.css";

const confirmAction = (props) => {
  return (
    <div className={classes.ConfirmCard}>
      <p>
        Are you sure you want to{" "}
        <span style={{ fontWeight: "bold" }}>{props.action}?</span>
      </p>
      <div className={classes.Buttons}>
        <button className={classes.Success} onClick={props.confirmAction}>
          Yes
        </button>
        <button className={classes.Danger} onClick={props.declineAction}>
          No
        </button>
      </div>
    </div>
  );
};

export default confirmAction;
