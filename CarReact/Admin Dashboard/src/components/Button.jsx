
export function Button(props) {
    return (
        <>
            <button style={{zIndex:"100"}} disabled={props.disabled} type="submit" onClick={() => props.handelClick(props.parameter)} key={props.key} className={props.className}>{props.name}</button>
        </>
    );
}