function Button2(props) {
  return (
    <button
      className={props.class}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
export default Button2;
