import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { setProductId } from '../store/actions';

export default function ItemEntry(props) {
  const dispatch = useDispatch();

    const handleClick = (params) =>{
    dispatch(setProductId(params));
    props.history.push(`/ProductDetails/${props.id}`);
  }
    return (
      <div className="col-md-6 col-lg-6 col-xl-4 mb-4">
        <div className="card">
          <img
            className="card-img-top"
            src={props.image}
            alt="Card"
          />
          <div className="card-body">
            <h4 className="card-title">{props.name}</h4>
            <p className="card-text">{props.description}</p>
            <p className="card-text">{props.price}</p>
            <p className="card-text">{props.carBrand}</p>
            <p className="card-text">{props.carModel}</p>

            <button className="btn btn-success" onClick={()=>handleClick(props._id)}>
              Details
            </button>
          </div>
        </div>
      </div>
    );
}
