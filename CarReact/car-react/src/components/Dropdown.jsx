import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions";

export default function Dropdown(props) {



  const blogFilterBrandActive = useSelector(state => state.blogFilterBrandActive);
  const dispatch = useDispatch();
  const [state, setstate] = useState("");
  const changeInputState = () =>{
    dispatch(Actions.getBlogsFilterBrandActive(true))
  }

  const handleChange = (event) => {
    setstate(event.target.value);
    setSubmit(event.target.value);

    changeInputState();
  };
  const [submit, setSubmit] = useState({
    name: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    //   axios
    //     .post("http://localhost:3000/user/auth/signup", userSignUpInfo)
    //     .then((res) => {
    //       console.log(res);
    //       localStorage.setItem("Authorization", res.headers.authorization);
    //       console.log(localStorage.getItem("Authorization"));
    //       if (res.data.Success === true) {
    //         console.log("hhkhkhkhk");
    //         props.history.push("/MyProfile");
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
  };

  useEffect(() => {
    const inputField = document.querySelector(".chosen-value");
    const dropdown = document.querySelector(".value-list");
    const dropdownArray = [...document.querySelectorAll("li")];
    // dropdown.classList.add("open");
    // inputField.focus(); // Demo purposes only
    let valueArray = [];
    dropdownArray.forEach((item) => {
      valueArray.push(item.textContent);
    });
    // const closeDropdown = () => {
    //   dropdown.classList.remove("open");
    // };
    inputField.addEventListener("input", () => {
      dropdown.classList.add("open");
      let inputValue = inputField.value.toLowerCase();
      let valueSubstring;
      if (inputValue.length > 0) {
        for (let j = 0; j < valueArray.length; j++) {
          if (
            !(
              inputValue.substring(0, inputValue.length) ===
              valueArray[j].substring(0, inputValue.length).toLowerCase()
            )
          ) {
            dropdownArray[j].classList.add("closed");
          } else {
            dropdownArray[j].classList.remove("closed");
          }
        }
      } else {
        for (let i = 0; i < dropdownArray.length; i++) {
          dropdownArray[i].classList.remove("closed");
        }
      }
    });
    // setstate(evt.target.value);
    dropdownArray.forEach((item) => {
      item.addEventListener("click", (evt) => {
        inputField.value = item.textContent;
        dropdownArray.forEach((dropdown) => {
          dropdown.classList.add("closed");
        });
      });
    });
    inputField.addEventListener("focus", () => {
      inputField.placeholder = "Type to filter";
      dropdown.classList.add("open");
      dropdownArray.forEach((dropdown) => {
        dropdown.classList.remove("closed");
      });
    });
    inputField.addEventListener("blur", () => {
      inputField.placeholder = "Brand";
      dropdown.classList.remove("open");
    });
    document.addEventListener("click", (evt) => {
      const isDropdown = dropdown.contains(evt.target);
      const isInput = inputField.contains(evt.target);
      
      if (!isDropdown && !isInput) {
        dropdown.classList.remove("open");
      }
    });
  }, []);
  // const [loopOn, setLoopOn] = useState("")
  // setLoopOn(props.loopOn)
  return (
    <div className="dropdownn">
      <form onSubmit={handleSubmit} method="post">
        <input
          class="chosen-value"
          type="text"
          value={state}
          name={props.name}
          placeholder="Select Brand"
          onChange={handleChange}
        />
        <ul class="value-list">
          {props.mapItems.map((item) => {
            return <li>{item.make}</li>;
          })}
        </ul>
      </form>
    </div>
  );
}
