function Label(props) {
  return (
    <label for={props.id} className={props.class}>
      {props.value}
    </label>
  );
}

export default Label;
