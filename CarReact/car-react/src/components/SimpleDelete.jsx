import React, { useEffect, useState } from "react";
import $ from 'jquery';
import axios from "axios";


export default function SimpleDelete(props) {
  const [classState, setclassState] = useState("box")
  const [classState2, setclassState2] = useState("bar");
  const handleHover = () => {
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

  useEffect(() => {
    var btn = document.querySelector( '.btn' );

var btnFront = btn.querySelector( '.btn-front' ),
    btnYes = btn.querySelector( '.btn-back .yes' ),
    btnNo = btn.querySelector( '.btn-back .no' );

btnFront.addEventListener( 'click', function( event ) {
  var mx = event.clientX - btn.offsetLeft,
      my = event.clientY - btn.offsetTop;

  var w = btn.offsetWidth,
      h = btn.offsetHeight;
	
  var directions = [
    { id: 'top', x: w/2, y: 0 },
    { id: 'right', x: w, y: h/2 },
    { id: 'bottom', x: w/2, y: h },
    { id: 'left', x: 0, y: h/2 }
  ];
  
  directions.sort( function( a, b ) {
    return distance( mx, my, a.x, a.y ) - distance( mx, my, b.x, b.y );
  } );
  
  btn.setAttribute( 'data-direction', directions.shift().id );
  btn.classList.add( 'is-open' );

} );

btnYes.addEventListener( 'click', function( event ) {	
  btn.classList.remove( 'is-open' );
} );

btnNo.addEventListener( 'click', function( event ) {
  btn.classList.remove( 'is-open' );
} );

function distance( x1, y1, x2, y2 ) {
  var dx = x1-x2;
  var dy = y1-y2;
  return Math.sqrt( dx*dx + dy*dy );
}
  }, [])
  return (
    <div className="simpleDelete">
      {/* <div
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
      </div> */}


<div className="btn">
        <div className="btn-back" >
          <p>Sure ?</p>
          <div className="row">
          <div
        type="button"
        name="delete"
        className={classState}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverLeave}
        onClick={()=>handleDelete(props.id)}
      >
          <button className="yes" style={{paddingRight: "40px",
paddingLeft: "20px",marginLeft:"30px"}}>Yes</button>
          </div>
          <button className="no">No</button>
          </div>
        </div>
        <div className="btn-front">Delete</div>
      
    </div>
    </div>
  );
}
