
export function Button(props) {
    return (
        <>
            <button type="submit" onClick={() => props.handelClick(props.storage)} key={props.storage} className={props.className}>{props.name}</button>
        </>
    );
}