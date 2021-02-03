import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import $ from 'jquery';

export default function Dropdown2(props) {

  const blogFilterBrandActive = useSelector(
    (state) => state.blogFilterBrandActive
  );
  useEffect(() => {
      $(document).ready(function () {
          if (!blogFilterBrandActive) {
              $(`#${props.name}`).prop("disabled", true);
          } else{
              $(`#${props.name}`).prop("disabled", false);
          }
      });
  }, [blogFilterBrandActive]);

  return (
    <div>
      <input
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
      </datalist>
    </div>
  );
}
