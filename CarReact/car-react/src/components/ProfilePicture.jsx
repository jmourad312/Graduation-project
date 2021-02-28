import $ from "jquery";
import axios from "axios";

export default function ProfilePicture(props) {


  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#imagePreview").css(
          "background-image",
          "url(" + e.target.result + ")"
        );
        $("#imagePreview").hide();
        $("#imagePreview").fadeIn(650);
      };
      const formData = new FormData();
      formData.append("image", input.files[0])
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: localStorage.getItem("Authorization"),
        },
      };
      const URL = `http://localhost:3000/user/updateUserProfile/${localStorage.getItem(
        "UserID"
        )}`;
        axios
        .put(URL,formData,config)
        .then((req) => {
         
        })
        .catch((error) => {
          console.log(error);
        });
      }
      reader.readAsDataURL(input.files[0]);
  }
  $("#imageUpload").change(function () {
    readURL(this);
  });
  
  return (
    <div className="profpic">
      <div className="container">
        <div className="avatar-upload">
          <div className="avatar-edit">
            <form>
              <input
                type="file"
                id="imageUpload"
                name="image"
                accept=".png, .jpg, .jpeg"
                // onChange={handleChange}
              />
              <label
                for="imageUpload"
              ></label>
            </form>
          </div>
          <div className="avatar-preview">
            <div
              id="imagePreview"
              style={{ backgroundImage: `url(${props.image})` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
