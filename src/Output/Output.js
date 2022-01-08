import React from "react";
import classes from "./Output.module.css";
import Levenshtein from "../Calculations/Levenshtein/Levenshtein";

const Output = (props) => {
  return (
    <React.Fragment>
      <Levenshtein
        regex={props.regularExpression}
        target={props.targetString}
      ></Levenshtein>
    </React.Fragment>
  );
};

export default Output;
