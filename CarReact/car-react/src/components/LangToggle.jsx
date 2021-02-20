import i18next from "i18next";
import React, { useEffect, useState } from "react";

export default function LangToggle() {

    const [state, setState] = useState("")

    const changeLanguage = (ln) => {
        return () => {
        setState(ln)
        i18next.changeLanguage(ln);
        };
    };


  return (
    <div className="language">
      <form class="tabber">
        <label for="t1" style={{paddingTop: "20px",paddingRight: "25px",zIndex:"2"}}>English</label>
        <input id="t1" name="lang" type="radio" checked={localStorage.getItem("i18nextLng")==="en"?true:false} onClick={changeLanguage("en")} />
        <label for="t2" style={{paddingTop: "20px",paddingRight: "25px",zIndex:"2"}}>العربية</label>
        <input id="t2" name="lang" type="radio" checked={localStorage.getItem("i18nextLng")==="ar"?true:false} onClick={changeLanguage("ar")}/>
        <div class="blob"></div>
      </form>
    </div>
  );
}
