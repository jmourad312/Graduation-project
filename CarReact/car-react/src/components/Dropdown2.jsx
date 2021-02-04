import React, { useEffect } from "react";
// import { useSelector } from "react-redux";


export default function Dropdown2(props) {

  // const blogFilterBrandActive = useSelector(
  //   (state) => state.blogFilterBrandActive
  // );
  // useEffect(() => {
  //     $(document).ready(function () {
  //         if (!blogFilterBrandActive) {
  //             $(`#${props.name}`).prop("disabled", true);
  //         } else{
  //             $(`#${props.name}`).prop("disabled", false);
  //         }
  //     });
  // }, [blogFilterBrandActive]);

  return (
    <div>
      {/* <input
        list={props.list}
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        // className={blogFilterBrandActive ? props.class : props.class+" disabled"}
      />
      <datalist id={props.list}>
        {props.Items.map((item) => {
          return <option value={item.make} />;
        })}
      </datalist> */}
      <label for="ice-cream-choice">Choose a brand:</label>
      <input list="ice-cream-flavors" id="brand" name={props.brand} />

      <datalist id="ice-cream-flavors" onChange={props.onChange}>
        {/* <option value="Chocolate"/> */}
        {props.Items.map((item, index) => {
          return <option key={index} value={item.make} />;
        })}
      </datalist>
    </div>
  );
}
