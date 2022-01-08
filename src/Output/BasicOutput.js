import React from "react";
import classes from "./BasicOutput.module.css";

const BasicOutput = () => {
  return (
    <React.Fragment>
      <div className={classes.container}>
        <table className={classes.table}>
          <tr className={classes.trow}>
            <td className={classes.tcell}>#</td>
          </tr>
        </table>
      </div>
      <div className={classes.result}>Min Distance : 0</div>
    </React.Fragment>
  );
};

export default BasicOutput;
