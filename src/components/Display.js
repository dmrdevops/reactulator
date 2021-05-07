export default function Display(props) {
  const opCheck = /[+\-*/]/g;
  const chars = {
    "-": "−",
    "/": "÷",
    "*": "×",
    "+": "+",
  };

  function symSwitch(array) {
    return array.join("").replace(opCheck, (match) => chars[match]);
  }

  function displayToggle() {
    if (props.powerState) {
      return props.tracked.length === 0 ? "0" : symSwitch(props.tracked);
    } else {
      return; //nothing
    }
  }

  return (
    <div id="input-display">
      <div className="entered-input">{symSwitch(props.entered)}</div>
      <div id="display" className="user-input">
        {displayToggle()}
      </div>
    </div>
  );
}
