function Input(props) {
  return (
    <>
      <input
        onChange={props.onChange}
        name={props.name}
        className={props.class}
        type={props.type}
        value={props.value}
        id={props.id}
        placeholder={props.placeHolder}
        required={props.req}
      ></input>
    </>
  );
}

export default Input;
