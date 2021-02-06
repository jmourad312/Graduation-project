import React from 'react'
import { useSelector } from 'react-redux';
import ItemEntry from '../../../../../components/ItemEntry';
import Loading from '../../../../../components/Loading';

export default function MyItems() {

    const vendorItems = useSelector(state => state.vendorItems.Data)
    const createItem = (item)=>{
        return (
          <ItemEntry
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            description={item.description}
            price={item.price}
            carBrand={item.carBrand}
            carModel={item.carModel}

            // key={""}
            // key={""}
            // key={""}
            // key={""}
            // key={""}
            // key={""}
          />
        );
    }

    return (
        <div className="FavouriteItems">
            <div className="container">
            <div className="row">
                {vendorItems?vendorItems.map(createItem):<Loading/>}
            </div>
            </div>
        </div>
    )
}
