import React, { useState, useEffect } from "react";
import Output from "../Output/Output";
import classes from "./Input.module.css";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";

const Input = (props) => {
  const [finalRegEx, setFinalRegEx] = useState("");
  const [finalTgtString, setFinalTgtString] = useState("");
  const [regularExpression, setRegularExpression] = useState("");
  const [targetString, setTargetString] = useState("");
  const [regularExpressionIsValid, setRegularExpressionIsValid] =
    useState(false);
  const [targetStringIsValid, setTargetStringIsValid] = useState(false);
  const [regularExpressionIsTouched, setRegularExpressionIsTouched] =
    useState(false);
  const [targetStringIsTouched, setTargetStringIsTouched] = useState(false);
  const [regularExpressionHasError, setregularExpressionHasError] =
    useState(false);
  const [targetStringHasError, setTargetStringHasError] = useState(false);

  // const regularExpressionHasError =
  //   !regularExpressionIsValid && regularExpressionIsTouched;
  // const targetStringHasError = !targetStringIsValid && targetStringIsTouched;

  let formIsValid = false;

  if (regularExpressionIsValid && targetStringIsValid) {
    formIsValid = true;
  }

  const regexInputSubmitHandler = (event) => {
    setRegularExpression(event.target.value);

    // if (regularExpression === "") {
    //   setRegularExpressionIsValid(false);
    // } else {
    //   setRegularExpressionIsValid(true);
    // }
  };

  const targetStringInputSubmitHandler = (event) => {
    setTargetString(event.target.value);

    // if (targetString === "") {
    //   setTargetStringIsValid(false);
    // } else {
    //   setTargetStringIsValid(true);
    // }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setFinalRegEx(regularExpression);
    setFinalTgtString(targetString);
    setRegularExpression("");
    setTargetString("");
    setRegularExpressionIsValid(false);
    setTargetStringIsValid(false);
    formIsValid = false;
    setRegularExpressionIsTouched(false);
    setTargetStringIsTouched(false);
    //console.log(regularExpression, targetString);
  };

  const regexInputBlurHandler = (event) => {
    setRegularExpressionIsTouched(true);
    if (regularExpression === "") {
      setRegularExpressionIsValid(false);
      setregularExpressionHasError(true);
    } else {
      setRegularExpressionIsValid(true);
      setregularExpressionHasError(false);
    }
  };

  const targetStringInputBlurHandler = (event) => {
    setTargetStringIsTouched(true);
    if (targetString === "") {
      setTargetStringIsValid(false);
      setTargetStringHasError(true);
    } else {
      setTargetStringIsValid(true);
      setTargetStringHasError(false);
    }
  };

  return (
    <React.Fragment>
      <Card className={classes.login}>
        <form onSubmit={onSubmitHandler}>
          <div className={classes.control}>
            <label htmlFor="regex">Regex</label>
            <input
              type="text"
              id="regex"
              value={regularExpression}
              onChange={regexInputSubmitHandler}
              onBlur={regexInputBlurHandler}
            ></input>
            {regularExpressionHasError && (
              <p className="error-text">
                Regular Expression must not be empty!
              </p>
            )}
          </div>
          <div className={classes.control}>
            <label htmlFor="targetString">Target String</label>
            <input
              type="text"
              id="targetString"
              value={targetString}
              onChange={targetStringInputSubmitHandler}
              onBlur={targetStringInputBlurHandler}
            ></input>
            {targetStringHasError && (
              <p className="error-text">Target String must not be empty!</p>
            )}
          </div>
          <div className={classes.actions}>
            <Button
              type="submit"
              className={classes.btn}
              disabled={!formIsValid}
            >
              Check
            </Button>
          </div>
        </form>
      </Card>
      <Output regularExpression={finalRegEx} targetString={finalTgtString} />
    </React.Fragment>
  );
};

export default Input;
