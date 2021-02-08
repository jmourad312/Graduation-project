import React, { useEffect, useState } from "react";
import $ from "jquery";
import { resultFromFilterProduct } from "../store/actions";
import { useDispatch } from "react-redux";

export default function SimpleSearch() {
  // useEffect(() => {

  //   function searchToggle(obj, evt) {
  //     var container = $(obj).closest(".search-wrapper");
  //     if (!container.hasClass("active")) {
  //       container.addClass("active");
  //       evt.preventDefault();
  //     } else if (
  //       container.hasClass("active") &&
  //       $(obj).closest(".input-holder").length == 0
  //     ) {
  //       container.removeClass("active");
  //       // clear input
  //       container.find(".search-input").val("");
  //     }
  //   }
    
  // }, [])

  const [search, setSearch] = useState("search-wrapper");
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const openSearch = () =>{
    setSearch("search-wrapper active")
  }
  const closeSearch = () => {
    setSearch("search-wrapper");
  };
  const handleSearch = () => {
    if (search === "search-wrapper") {
      setSearch("search-wrapper active");
    } else if ( search === "search-wrapper active" && searchValue===""){
      setSearch("search-wrapper");
      setSearchValue("");
    } else {
      actionToFilterOption();
    }
  };
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  };
  const actionToFilterOption = () => {
    dispatch(resultFromFilterProduct(searchValue));
  };



  return (
    <div className="simpleSearch">
      {/* <div class="search-wrapper">
        <div class="input-holder">
          <input
            type="text"
            class="search-input"
            placeholder="Type to search"
          />
          <button class="search-icon" onclick="searchToggle(this, event);">
            <span></span>
          </button>
        </div>
        <span class="close" onclick="searchToggle(this, event);"></span>
      </div> */}
      <div className={search}>
        <div className="input-holder">
          <input
            type="text"
            className="search-input"
            placeholder="Type to search"
            value={searchValue}
            onChange={handleSearchChange}
          />
          <button className="search-icon" onClick={handleSearch}>
            <span></span>
          </button>
        </div>
        <div className="close" onClick={handleSearch}></div>
      </div>
    </div>
  );
}
