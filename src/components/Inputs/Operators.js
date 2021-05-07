import Button from "./Button";

const Operators = ({ handleEvent }) => {
  return (
    <div className="container-operators">
      <Button id="pos-neg" onClick={handleEvent} value="+/-">
        POS/NEG
      </Button>
      <Button id="divide" onClick={handleEvent} value="/">
        ÷
      </Button>
      <Button id="multiply" onClick={handleEvent} value="*">
        ×
      </Button>
      <Button id="subtract" onClick={handleEvent} value="-">
        −
      </Button>
      <Button id="add" onClick={handleEvent} value="+">
        +
      </Button>
      <Button id="equals" onClick={handleEvent} value="=">
        =
      </Button>
    </div>
  );
};

export default Operators;
