
export function Button(props) {
    return (
        <>
            <button type="submit" onClick={() => props.handelClick(props.parameter)} key={props.key} className={props.className}>{props.name}</button>
        </>
    );
}