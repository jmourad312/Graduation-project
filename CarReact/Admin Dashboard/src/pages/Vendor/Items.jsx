import React, { useEffect, useState } from 'react'
import { Card } from '../../components/Card'
import { Navbar } from '../../components/Navbar'
import { useSelector, useDispatch } from "react-redux";
import {getItemsVendor} from '../../store/action'
import { instance } from "../../network/axiosConfig";


export default function Items(props) {

    const data = props.location.state.data;

    const stateRedux = useSelector((state) => state)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getItemsVendor(data._id))
    }, [stateRedux.products])

    const handelClickDetails = (parameter)=>{
        props.history.push({
            pathname: '/DetailsProduct',
            state: { data: parameter }
        })
    }

    const handelClickEdit = (parameter) => {

    }

    const handelClickDelete = async (parameter) => {
        try {
            const res = await instance.delete(`vendor/deleteItem/${parameter._id}/${data._id}`,
            {headers: { Authorization: localStorage.getItem("Authorization")}});
            console.log(res);

        } catch (error) {
            console.log(error);
        }
        
    }

    const createProducts = (prod) => {
        return (
          <Card
            key={prod._id}
            id={prod._id}
            idperson={data._id}
            images={prod.images[0]}
            description={prod.description}
            price={prod.price}
            name={data.firstName ? data.firstName : "vendor" }
            title={prod.name}
            brand={prod.carBrand}
            model={prod.carModel}
            dataItem={prod}
            // category={prod.category}
            // details={handelClickDetails}
            edit={handelClickEdit}
            delete={handelClickDelete}
          />
        );
      };

    return (

        <div className="admin">
            <div className="container-for-admin pt-3 mt-2">
                <Navbar />
                <h1 className="m-5">Products By {data.firstName}</h1>

                <div className="col-12" style={{ marginTop: "2%" }}>
                    <div className="row">
                        {stateRedux.products.Data != null && stateRedux.products.Data.map(createProducts)}
                    </div>
                </div>
            </div>
        </div>
    );
}