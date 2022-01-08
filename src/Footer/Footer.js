import classes from "./Footer.module.css";

import React from "react";

const Footer = (props) => {
  return (
    <React.Fragment>
      <div className={props.className}>
        <p className={classes.text}>
          Copyright © 2021 EditDistance.com | All Rights Reserved
        </p>
      </div>
    </React.Fragment>
  );
};

export default Footer;
