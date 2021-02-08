import React from "react";
import $ from "jquery";

export default function SimpleSearch() {
  function searchToggle(obj, evt) {
    var container = $(obj).closest(".search-wrapper");
    if (!container.hasClass("active")) {
      container.addClass("active");
      evt.preventDefault();
    } else if (
      container.hasClass("active") &&
      $(obj).closest(".input-holder").length == 0
    ) {
      container.removeClass("active");
      // clear input
      container.find(".search-input").val("");
    }
  }
  return (
    <div className="simpleSearch">
      <div class="search-wrapper">
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
      </div>
    </div>
  );
}
