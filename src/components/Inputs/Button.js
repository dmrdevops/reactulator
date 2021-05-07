export default function Button(props) {
  return (
    <button
      className={props.className}
      id={props.id}
      onClick={props.onClick}
      value={props.value}
    >
      {props.children}
    </button>
  );
}
