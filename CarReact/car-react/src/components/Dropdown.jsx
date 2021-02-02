import React from "react";

export default function Dropdown(props) {
  return (
    <div className="dropdownn">
      <div className="select-box__current w-100" tabindex="0">
        {props.mapItems.map((item, index) => {
          return (
            <div className="select-box__value">
              <input
                className="select-box__input"
                type="radio"
                id={item + index}
                value={item}
                name={props.name}
                checked="checked"
              />
              <p className="select-box__input-text">{item}</p>
            </div>
          );
        })}
        <img
          className="select-box__icon"
          src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
          alt="Arrow Icon"
        />
      </div>
      <ul className="select-box__list">
        {props.mapItems.map((item, index) => {
          return (
            <li>
              <label className="select-box__option" for={item + index}>
                {item}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
