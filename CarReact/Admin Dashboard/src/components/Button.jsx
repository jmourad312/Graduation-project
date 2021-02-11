
export function Button(props) {
    return (
        <>
            <button disabled={props.disabled} type="submit" onClick={() => props.handelClick(props.parameter)} key={props.key} className={props.className}>{props.name}</button>
        </>
    );
}