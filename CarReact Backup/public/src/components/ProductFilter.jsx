import React from 'react'
import Dropdown from './Dropdown'
import cars2 from '../assets/js/cars2';
import cars from "../assets/js/cars";


export default function ProductFilter() {
    const carBrand = ["BMW", "AUDI", "MAZARATI", "HYUNDAI"];
    const carBrand2 = ["BMW2", "AUDI", "MAZARATI", "HYUNDAI"];
    const carBrand3 = ["BMW2", "AUDI", "MAZARATI", "HYUNDAI"];
    return (
      <div className="productFilter">
        <div className="row">
          <Dropdown mapItems={cars2} name="brand" />
        </div>

        {/* <div className="row mt-2">
          <Dropdown mapItems={carBrand2} name="model" />
        </div>
        <div className="row mt-2">
          <Dropdown mapItems={carBrand3} name="sda" />
        </div> */}
      </div>
    );
}
