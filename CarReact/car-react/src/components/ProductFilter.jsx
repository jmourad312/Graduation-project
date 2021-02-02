import React from 'react'
import Dropdown from './Dropdown'

export default function ProductFilter() {
    const carBrand = ["BMW", "AUDI", "MAZARATI", "HYUNDAI"];
    const carBrand2 = ["BMW2", "AUDI", "MAZARATI", "HYUNDAI"];
    const carBrand3 = ["BMW2", "AUDI", "MAZARATI", "HYUNDAI"];
    return (
      <div className="productFilter">
        <div className="row">
          <Dropdown mapItems={carBrand} name="brand" />
        </div>
        <div className="row mt-2">
          <Dropdown mapItems={carBrand2} name="model" />
        </div>
        <div className="row mt-2">
          <Dropdown mapItems={carBrand3} name="sda" />
        </div>
      </div>
    );
}
