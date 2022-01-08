import React from "react";
import classes from "./Levenshtein.module.css";
import Footer from "../../Footer/Footer";

const Levenshtein = (props) => {
  var current = new Array(props.target.length + 1);
  for (let i = 0; i < props.target.length + 1; i++) {
    current[i] = new Array(props.regex.length + 1).fill(0);
  }
  console.log(current);
  for (let t_i = 0; t_i < props.target.length + 1; t_i++) {
    for (let r_i = 0; r_i < props.regex.length + 1; r_i++) {
      // initialize [0,0] with 0
      if (r_i === 0 && t_i === 0) current[t_i][r_i] = 0;
      // if the length of regex is 0, then [t_i][r_i] = t_i (subtract these many from t_i)
      else if (r_i === 0) current[t_i][r_i] = t_i;
      // if the length of target string is 0, then perform the following
      // if target is of length 0 then calculate significant digits and take care of special symbols
      else if (t_i === 0) {
        var i = r_i - 1; // like i-1 of dp
        var counter = 0;
        while (i >= 0) {
          var char = props.regex[i];
          i -= char === "?" || char === "*" || char === "+" ? 2 : 1; // subtracting 2 because after leaving 1 space we will get another regex char
          counter += !(char === "?" || char === "*") ? 1 : 0; // if not ? or *, we need to subtract 1 (because ? and * can include 0 or more)
        }
        current[t_i][r_i] = counter;
      }
      // dot means any character is acceptable, so just replicate prev ans
      else if (props.regex[r_i - 1] === ".")
        // Regex special cases
        current[t_i][r_i] = current[t_i - 1][r_i - 1];
      else if (
        props.regex[r_i - 1] === "+" ||
        props.regex[r_i - 1] === "*" ||
        props.regex[r_i - 1] === "?"
      ) {
        // when target string character = regex character (using r_i-2 because r_i-1 is either of ?/*/+)
        if (props.regex[r_i - 2] === props.target[t_i - 1]) {
          // ? means 0 or 1, and since we already checked that the characters are equal, we copy ans of [t_i][r_i-2]
          if (props.regex[r_i - 1] == "?") {
            current[t_i][r_i] = Math.min(
              current[t_i][r_i - 2],
              current[t_i - 1][r_i - 2]
            );
          } else if (props.regex[r_i - 1] == "*")
            current[t_i][r_i] = Math.min(
              current[t_i][r_i - 2],
              current[t_i - 1][r_i - 2],
              current[t_i - 1][r_i]
            );
          else
            current[t_i][r_i] = Math.min(
              current[t_i - 1][r_i - 2], // first time occuring (removing a+)
              current[t_i - 1][r_i] // already occured multiple times (not removing a+)
            );
        }
        // when target string character != regex character
        else {
          let additional_cost = props.regex[r_i - 1] === "+" ? 1 : 0; // because + means 1 or more, so we add 1 as additional cost if sign is +
          current[t_i][r_i] = Math.min(
            current[t_i - 1][r_i - 2] + 1, // since r_i-1 is a special character, therefore r_i-2 and t_i-2 means 1 char gone from both,so replace
            current[t_i - 1][r_i] + 1, // insert (target-1 and r_i till now, we add 1 to t_i)
            current[t_i][r_i - 2] + additional_cost // delete from t_i, if we delete we need to add additional_cost
          );
        }
      } else if (props.regex[r_i - 1] === props.target[t_i - 1])
        // Normal characters and equal
        current[t_i][r_i] = current[t_i - 1][r_i - 1];
      // when normal characters and not equal (basic edit distance)
      else {
        current[t_i][r_i] = Math.min(
          current[t_i - 1][r_i - 1] + 1, // replace (add 1 to prev result, ie ab and ab)
          current[t_i - 1][r_i] + 1, // delete (add 1 to ans of ab and abz)
          current[t_i][r_i - 1] + 1 // insert
        );
      }
    }
  }
  console.log(current);
  var finalMatrix = current;
  var minOperations = current[current.length - 1][current[0].length - 1]; // current[2][3] = 0
  //
  var finalMatrix2 = new Array(props.regex.length + 1); // 4
  for (let i = 0; i < props.regex.length + 1; i++) {
    finalMatrix2[i] = new Array(props.target.length + 1).fill(0); // size 3, fill with 0
  }
  finalMatrix2[0][0] = "#";
  for (let i = 0; i < props.target.length; i++) {
    finalMatrix2[0][i + 1] = props.target[i];
  }
  var indexOfRedux = 0;
  for (let i = 1; i < props.regex.length + 1; i++) {
    for (let j = 0; j < props.target.length + 1; j++) {
      if (j == 0) {
        finalMatrix2[i][j] = props.regex[indexOfRedux++];
      } else {
        finalMatrix2[i][j] = current[j][i];
      }
    }
  }
  console.log(current);
  console.log(finalMatrix2);
  //return finalMatrix;
  return (
    <React.Fragment>
      <div className={classes.container}>
        {/* <table>
        <tbody>
          {finalMatrix.map((item) => {
            return <tr>{item}</tr>;
          })}
        </tbody>
      </table> */}
        <table className={classes.table}>
          <tbody>
            {/* <tr className={classes.trow}>
              <td className={classes.tcell}>{props.regex}</td>
            </tr> */}
            {finalMatrix2.map((items) => {
              return (
                <tr className={classes.trow}>
                  {items.map((item) => {
                    return <td className={classes.tcell}>{item}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={classes.result}>Min Distance : {minOperations}</div>

      {/* <Footer className={classes.footer} /> */}
    </React.Fragment>
  );
};

export default Levenshtein;
