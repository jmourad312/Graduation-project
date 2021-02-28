import { Navbar } from "../components/Navbar";
import { useState } from "react";
import { InputField } from "../components/InputField";
import { Button2 } from "../components/Button";
import { instance } from "../network/axiosConfig";

export default function AddPerson(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    firstName: "",
    person: "",
  });
  const [error, setError] = useState({
    email: null,
    password: null,
    firstName: null,
  });

  const tiggreValue = (e) => {
    var pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    switch (e.target.name) {
      case "email":
        setState({
          ...state,
          email: e.target.value,
        });
        setError({
          ...error,
          email:
            e.target.value.length <= 0
              ? "this field required"
              : e.target.value.length <= 6
              ? "length must be 6 or more "
              : pattern.test(e.target.value)
              ? null
              : "in valid email",
        });
        break;
      case "person":
        setState({
          ...state,
          person: e.target.value,
        });
        break;

      case "password":
        setState({
          ...state,
          password: e.target.value,
        });
        setError({
          ...error,
          password:
            e.target.value.length <= 0
              ? "this field required"
              : e.target.value.length < 6
              ? "length must be 6 or more "
              : null,
        });
        break;
        case "firstName":
            setState({
              ...state,
              firstName: e.target.value,
            });
            setError({
              ...error,
              firstName:
                e.target.value.length <= 0
                  ? "this field required"
                  : e.target.value.length <= 3
                  ? "length must be 3 or more "
                  : null,
            });
            break;
      default:
        break;
    }
  };

  const getSignUp = async () => {
      if(state.person == "User"){
        try {
            const res = await instance.post("http://localhost:3000/user/auth/signup", {firstName:state.firstName,email:state.email,password:state.password})
            alert("Done add user")
            console.log(res);
        } catch (error) {
            console.log(error);
        }
      }
      if(state.person == "Vendor"){
        try {
            const res = await instance.post("http://localhost:3000/vendor/auth/signup",  {firstName:state.firstName,email:state.email,password:state.password})
            alert("Done add vendor")
            console.log(res);

        } catch (error) {
            console.log(error);
        }
      }

      if(state.person == "Admin"){
        try {
            const res = await instance.post("http://localhost:3000/admin/auth/signup",  {firstName:state.firstName,email:state.email,password:state.password},
            {headers: { Authorization: localStorage.getItem("Authorization")}});
            alert("Done add admin")
            console.log(res);

        } catch (error) {
            console.log(error);
        }
      }
      if(state.person == "") {
          alert("choose sign up as vendor or user")
      }
  };

  return (
    <>
      <div className="">
        <div className="container-for-admin mb-5" >
          <Navbar />

          <div className="container mt-5 pt-5" style={{width:"930px"}}>
            <div
              className="card mb-2 shadow p-4 bg-white"
              style={{ width: "900px" }}
            >
              <div className="card-header">
                <h2 style={{ fontFamily: "Georgia, serif" }}>DREKSYONY</h2>
              </div>
              <div className="card-body">
                <select
                  value={state.person}
                  name="person"
                  onChange={tiggreValue}
                  className="custom-select custom-select-md mb-3"
                >
                  <option value="" key="no-value">
                    Make account to...
                  </option>
                  <option value="User" key="User">
                    User
                  </option>
                  <option value="Vendor" key="Vendor">
                    Vendor
                  </option>
                  <option value="Admin" key="Admin">
                  Admin
                  </option>
                </select>

                <InputField
                  value={state.firstName}
                  type="text"
                  handleChange={(e) => tiggreValue(e)}
                  className="form-control"
                  name="firstName"
                  error={error.firstName}
                />
                <InputField
                  value={state.email}
                  type="email"
                  handleChange={(e) => tiggreValue(e)}
                  className="form-control"
                  name="email"
                  error={error.email}
                />
                <InputField
                  value={state.password}
                  type="password"
                  handleChange={(e) => tiggreValue(e)}
                  className="form-control"
                  name="password"
                  error={error.password}
                />
              </div>
              <div className="card bg-success text-white">
                <div className="card-footer">
                  <Button2
                    className="btn text-white"
                    handelClick={getSignUp}
                    parameter={state}
                    name="Done"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
