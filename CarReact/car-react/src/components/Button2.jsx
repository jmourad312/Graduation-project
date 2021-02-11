function Button2(props) {
  return (
    <button
      className={props.class}
      onClick={() => props.handleClick(props.parameter)}
      key={props.key}
    >
      {props.value}
    </button>
  );
}
export default Button2;
