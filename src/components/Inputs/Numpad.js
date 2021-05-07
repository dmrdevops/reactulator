import Button from "./Button";

export default function Numpad({ handleEvent }) {
  const numId = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const numbers = [...Array(10).keys()].reverse().map((num) => {
    return (
      <Button key={num} id={numId[num]} onClick={handleEvent} value={num}>
        {num}
      </Button>
    );
  });

  return (
    <div className="numpad">
      {numbers}
      <Button id="decimal" onClick={handleEvent} value={"."}>
        .
      </Button>
    </div>
  );
}
