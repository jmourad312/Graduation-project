import { Button } from "./Button";

export function Card(props) {

    return (
        <div className="card mb-2 shadow p-4 bg-white" style={{width:"250px"}}>
            
            <img className="card-img-top" style={{height:"200px"}} src={props.image} alt="Card" />
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.text}</p>
            </div>
            <div className="d-flex flex-wrap">
            <Button className="btn btn-success ml-3" name="Details" handelClick={props.details} />
            <Button className="btn btn-warning ml-3" name="Update" handelClick={props.update} />
            <Button className="btn btn-danger ml-3" name="Delete" handelClick={props.delete} />
            </div>

        </div>

    );
}