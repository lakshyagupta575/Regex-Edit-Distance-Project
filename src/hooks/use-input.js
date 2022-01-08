import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  // We will also need a way of letting the Components that uses this hook set the entered value and set detached state thereafter.
  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  // When an input is losing focus we use this (however, we also want to now check for every keystroke so that the user knows when its valid)
  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError: hasError,
    valueChangeHandler: valueChangeHandler, // So that these functions which are defined in the hook
    inputBlurHandler: inputBlurHandler, // can be called from the place where to hook is being used.
    reset: reset,
  };
};

export default useInput;
