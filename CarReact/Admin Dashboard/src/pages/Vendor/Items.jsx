import React, { useEffect, useState } from 'react'
import { Card } from '../../components/Card'
import { Navbar } from '../../components/Navbar'
import { useSelector, useDispatch } from "react-redux";
import {getItemsVendor} from '../../store/action'

export default function Items(props) {

    const data = props.location.state.data;

    const stateRedux = useSelector((state) => state)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getItemsVendor(data._id))
    }, [])

    const handelClickDetails = (parameter)=>{
        props.history.push({
            pathname: '/DetailsProduct',
            state: { data: parameter }
        })
    }

    const handelClickEdit = (parameter) => {

    }

    const handelClickDelete = (parameter) => {
        
    }

    const createProducts = (prod) => {
        return (
          <Card
            key={prod._id}
            id={prod._id}
            image={prod.image}
            description={prod.description}
            price={prod.price}
            name={data.firstName}
            title={prod.name}
            brand={prod.carBrand}
            model={prod.carModel}
            // category={prod.category}
            details={handelClickDetails}
            edit={handelClickEdit}
            delete={handelClickDelete}
          />
        );
      };

    return (

        <div className="admin">
            <div className="container-for-admin">
                <Navbar />
                <h1 className="m-5">Products By {data.firstName}</h1>

                <div className="col-12" style={{ marginTop: "2%" }}>
                    <div className="row">
                        {stateRedux.products.length !=0 && stateRedux.products.Data.map(createProducts)}
                    </div>
                </div>
            </div>
        </div>
    );
}