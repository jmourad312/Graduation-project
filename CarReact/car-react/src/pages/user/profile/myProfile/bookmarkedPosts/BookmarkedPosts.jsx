// import Dropdown from "../../../../../components/Dropdown";

export default function BookmarkedPosts() {
  const carBrand = ["BMW", "AUDI", "MAZARATI", "HYUNDAI"];
  const carBrand2 = ["BMW2", "AUDI", "MAZARATI", "HYUNDAI"];
  const carBrand3 = ["BMW2", "AUDI", "MAZARATI", "HYUNDAI"];


  return (
    <div className="BookmarkedPosts">
      <div className="container mt-3">
                <div className="media border p-3">
                    <img src="" alt="John Doe" className="mr-3 rounded-circle" />
                    <div className="media-body">
                        <h4>John Doe <small><i>Posted on February 19, 2016</i></small></h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
            </div>
    </div>
  );
}
