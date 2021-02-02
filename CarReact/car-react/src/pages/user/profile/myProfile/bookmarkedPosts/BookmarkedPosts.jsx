import Dropdown from "../../../../../components/Dropdown";

export default function BookmarkedPosts() {
  const carBrand = ["BMW", "AUDI", "MAZARATI", "HYUNDAI"];
  const carBrand2 = ["BMW2", "AUDI", "MAZARATI", "HYUNDAI"];
  const carBrand3 = ["BMW2", "AUDI", "MAZARATI", "HYUNDAI"];


  return (
    <div>
      <div className="row">
        <div className="col-4">
          <Dropdown mapItems={carBrand} name="brand" />
        </div>
        <div className="col-4">
          <Dropdown mapItems={carBrand2} name="model" />
        </div>
        <div className="col-4">
          <Dropdown mapItems={carBrand3} name="not model" />
        </div>
      </div>
    </div>
  );
}
