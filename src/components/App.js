import React, { useState, useEffect } from "react";
import Display from "./Display";
import Credits from "./Credits";
import Numpad from "./Inputs/Numpad";
import Operators from "./Inputs/Operators";
import Controls from "./Inputs/Controls";
import "../css/App.css";

//Globals
export const pwrVal = "POWER";
export const pwrOn = "POWER ON";
export const pwrOff = "POWER OFF";
export const acVal = "Delete";
export const clrVal = "Backspace";

export default function App() {
  const [powerState, setPowerState] = useState(true);
  const [negSwitch, setNegSwitch] = useState(false);
  const [decimal, setDecimal] = useState(false);
  const [entered, setEntered] = useState([]);
  const [tracked, setTracked] = useState([]);
  const [calculated, setCalculated] = useState(false);

  const opRegex = /[+\-*/]/;
  const digits = /[0-9]/;

  useEffect(() => {
    if (calculated) {
      handleMath();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculated]);

  useEffect(() => {
    document.addEventListener("keydown", unifyEventValue);
    return () => document.removeEventListener("keydown", unifyEventValue);
  });

  function unifyEventValue(event) {
    let eventValue;
    if (event.type === "click") {
      eventValue = event.target.value;
    } else if (event.type === "keydown") {
      if (event.key === "Enter") {
        eventValue = "=";
      } else {
        const buttons = [...document.querySelectorAll("button")];
        // eslint-disable-next-line array-callback-return
        buttons.filter((item) => {
          if (event.key === item.value) {
            eventValue = event.key;
          }
        });
      }
    }
    return equalClear(eventValue);
  }

  function equalClear(event) {
    if (calculated) {
      setCalculated(false);
      setEntered([]);
      setTracked([]);
      eventSwitch(event);
    } else {
      eventSwitch(event);
    }
  };

  function eventSwitch(event) {
    const isDigit = (arg) => {
      return digits.test(arg) ? arg : false;
    };
    const isOperator = (arg) => {
      return opRegex.test(arg) ? arg : false;
    };

    if (event === pwrVal) {
      return handlePower();
    } else {
      if (powerState) {
        switch (event) {
          case isDigit(event):
            return handleDigits(event);
          case ".":
            return handleDecimal();
          case "+/-":
            return handleNegSwitch();
          case isOperator(event):
            return handleOperator(event);
          case "=":
            return handleEquals();
          case pwrVal:
            return;
          case acVal:
            return handleAllClear();
          case clrVal:
            return handleClear();
          default:
            break;
        }
      }
    }
  }

  function handleDigits(event) {
    if (negSwitch) {
      setTracked((prevState) => [...prevState, event]);
    } else if (opRegex.test(tracked[0]) && tracked.length === 1) {
      setTracked([event]);
    } else {
      setTracked((prevState) => [...prevState, event]);
    }
  }

  function handleDecimal() {
    if (!decimal) {
      setDecimal(true);
      if (tracked.length === 0) {
        setTracked(["0", "."]);
      } else if (tracked.length === 1 && opRegex.test(tracked[0])) {
        setTracked(["0", "."]);
      } else {
        setTracked((prevState) => [...prevState, "."]);
      }
    }
  }

  function handleNegSwitch() {
    if (negSwitch) {
      setNegSwitch(false);
      setTracked((prevState) => [...prevState.slice(1, prevState.length)]);
    } else if (opRegex.test(tracked[0])) {
      //Do nothing
    } else {
      setNegSwitch(true);
      setTracked((prevState) => ["-", ...prevState]);
    }
  }

  function handleOperator(event) {
    if (negSwitch) {
      if (tracked.length === 1 && opRegex.test(entered[entered.length - 1])) {
        setNegSwitch(false);
        setEntered((prevState) => [
          ...prevState.slice(0, prevState.length - 1),
          event,
        ]);
        setTracked([event]);
      } else {
        setNegSwitch(false);
        setDecimal(false);
        setEntered((prevState) => [...prevState, "(", ...tracked, ")", event]);
        setTracked([event]);
      }
    } else {
      if (tracked.length === 0 && event === "-") {
        setNegSwitch(true);
        setTracked([event]);
      } else if (tracked.length === 0) {
        setEntered(["0", event]);
        setTracked([event]);
      } else if (
        tracked.length === 1 &&
        opRegex.test(tracked[0]) &&
        event === "-"
      ) {
        setNegSwitch(true);
        setTracked([event]);
      } else {
        if (
          opRegex.test(tracked[0]) &&
          opRegex.test(entered[entered.length - 1])
        ) {
          setEntered((prevState) => [
            ...prevState.slice(0, prevState.length - 1),
            event,
          ]);
          setTracked([event]);
        } else {
          setNegSwitch(false);
          setDecimal(false);
          setEntered((prevState) => [...prevState, ...tracked, event]);
          setTracked([event]);
        }
      }
    }
  }

  function handleEquals() {
    if (!calculated && tracked.length > 0 && !opRegex.test(tracked[0])) {
      setEntered((prevState) => [...prevState, ...tracked]);
      setCalculated(true);
    }
  }

  function handleMath() {
    setEntered((prevState) => [...prevState, "="]);
    // eslint-disable-next-line no-eval
    setTracked([eval(entered.join(""))]);
  }

  function handlePower() {
    setPowerState(!powerState);
    setNegSwitch(false);
    setDecimal(false);
    setEntered([]);
    setTracked([]);
    setCalculated(null);
  }

  function handleAllClear() {
    setNegSwitch(false);
    setEntered([]);
    setDecimal(false);
    setTracked([]);
  }

  function handleClear() {
    if (tracked.length > 1) {
      setTracked((prevState) => [...prevState.slice(0, prevState.length - 1)]);
    } else if (!opRegex.test(tracked[0])) {
      setNegSwitch(false);
      setTracked([]);
    } //Do nothing
  }

  return (
    <>
      <div className="calculator">
        <h1 id="decoration">Reactulator</h1>
        <Display
          entered={entered}
          powerState={powerState}
          handleEvent={unifyEventValue}
          tracked={tracked}
        />
        <Numpad handleEvent={unifyEventValue} />
        <Operators handleEvent={unifyEventValue} />
        <Controls handleEvent={unifyEventValue} powerState={powerState} />
      </div>
      <Credits />
    </>
  );
};