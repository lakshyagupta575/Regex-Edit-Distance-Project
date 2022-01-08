import React, { useState, useEffect } from "react";
import Output from "../Output/Output";
import classes from "./Input2.module.css";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import useInput from "../hooks/use-input";
import Footer from "../Footer/Footer";
import BasicOutput from "../Output/BasicOutput";

const Input = (props) => {
  const [showGrid, setShowGrid] = useState(false);
  const [footerIsFixed, setFooterIsFixed] = useState(true);
  const [finalRegEx, setFinalRegEx] = useState("");
  const [finalTgtString, setFinalTgtString] = useState("");
  const {
    value: regexValue,
    isValid: regexIsValid,
    hasError: regexHasError,
    valueChangeHandler: regexChangeHandler,
    inputBlurHandler: regexBlurHandler,
    reset: resetRegex,
  } = useInput((value) => value.trim() !== "");

  const {
    value: targetStringValue,
    isValid: targetStringIsValid,
    hasError: targetStringHasError,
    valueChangeHandler: targetStringChangeHandler,
    inputBlurHandler: targetStringBlurHandler,
    reset: resetTargetString,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (regexIsValid && targetStringIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    setFinalRegEx(regexValue);
    setFinalTgtString(targetStringValue);
    setShowGrid(true);
    if (regexValue.length > 3) {
      setFooterIsFixed(false);
    }
    // resetRegex();
    // resetTargetString();
  };

  const clearInputs = (event) => {
    setShowGrid(false);
    resetRegex();
    resetTargetString();
    setFooterIsFixed(true);
  };

  const regexClass = regexHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const targetStringClass = targetStringHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  // console.log(footerCss);

  return (
    <React.Fragment>
      <Card className={classes.login}>
        <form onSubmit={formSubmissionHandler}>
          <div className={regexClass}>
            <label htmlFor="regex">Regex</label>
            <input
              type="text"
              id="regex"
              value={regexValue}
              onChange={regexChangeHandler}
              onBlur={regexBlurHandler}
            ></input>
            {regexHasError && (
              <p className={classes.errorText}>
                {"\xa0\xa0\xa0\xa0"}Regular Exp. must not be empty!
              </p>
            )}
          </div>
          <div className={targetStringClass}>
            <label htmlFor="targetString">Target String</label>
            <input
              type="text"
              id="targetString"
              value={targetStringValue}
              onChange={targetStringChangeHandler}
              onBlur={targetStringBlurHandler}
            ></input>
            {targetStringHasError && (
              <p className={classes.errorText}>
                {"\xa0\xa0\xa0\xa0"} Target String must not be empty!
              </p>
            )}
          </div>
          <div className={classes.actions}>
            <Button
              type="submit"
              className={classes.btn1}
              disabled={!formIsValid}
            >
              Check
            </Button>
            <Button
              className={classes.btn2}
              disabled={!regexIsValid && !targetStringIsValid}
              onClick={clearInputs}
            >
              Clear
            </Button>
          </div>
        </form>
      </Card>
      {!showGrid && <BasicOutput />}
      {showGrid && (
        <Output regularExpression={finalRegEx} targetString={finalTgtString} />
      )}
      <Footer
        className={footerIsFixed ? classes.footerFixed : classes.footer}
      />
    </React.Fragment>
  );
};

export default Input;
