import Button from "./Button";
import { pwrVal, acVal, clrVal } from "../App";

export default function Controls({ handleEvent }) {
  return (
    <div className="container-controls">
      <Button onClick={handleEvent} value={pwrVal}>
        PWR
      </Button>
      <Button onClick={handleEvent} value={acVal}>
        AC
      </Button>
      <Button onClick={handleEvent} value={clrVal}>
        CLEAR
      </Button>
    </div>
  );
}
