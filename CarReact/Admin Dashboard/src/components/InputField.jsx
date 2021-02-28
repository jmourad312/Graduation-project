
export function InputField(props) {

    return (

            <div>
                <label className="mr-4" htmlFor={props.name}>{props.name} </label>
                <input type={props.type} className={props.className} key={props.name} name={props.name} onChange={props.handleChange} value={props.value} />
            <p className="text-danger">{props.error}</p>
            </div>

    );
}