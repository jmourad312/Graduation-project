
export function Button2(props) {
    return (
        <>
            <button style={{zIndex:"100",width:"120px",marginBottom:"5px",marginRight:"10px"}} disabled={props.disabled} type="submit" onClick={() => props.handelClick(props.parameter)} key={props.key} className={props.className}>{props.name}</button>
        </>
    );
}