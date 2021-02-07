import React, { useState } from "react";
import $ from 'jquery';
import axios from "axios";


export default function SimpleDelete(props) {
    const [classState, setclassState] = useState("box")
    const [classState2, setclassState2] = useState("bar");
    const handleHover = () =>{
        setclassState2("bar cl-bar2");
        setclassState("cl-box2 box");
    }
    const handleHoverLeave = () => {
      setclassState("box");
      setclassState2("bar");
    };

    const handleDelete = (params) => {
      axios
        .delete(`http://localhost:3000/user/deletePost/${params}`, {
          headers: { Authorization: localStorage.getItem("Authorization") },
        })
        .then((req) => {
          console.log(req);
          if (req.data.Success === true) {
            console.log("success");
          } else {
            console.log("fail");
            console.log(req.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  return (
    <div className="simpleDelete">
      <div
        type="button"
        name="delete"
        className={classState}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverLeave}
        onClick={()=>handleDelete(props.id)}
      >
        <div className="box-left">
          <i className="but-icon fa fa-lg fa-times"></i>

          <div className={classState2}>
            <i className="but-icon fa fa-lg fa-check"></i>
          </div>
        </div>
        <div className="box-right"></div>
      </div>
    </div>
  );
}
