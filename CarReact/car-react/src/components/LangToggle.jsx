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
        <label for="t1">English</label>
        <input id="t1" name="lang" type="radio" checked={state==="en"?true:false} onClick={changeLanguage("en")} />
        <label for="t2">العربية</label>
        <input id="t2" name="lang" type="radio" checked={state==="ar"?true:false} onClick={changeLanguage("ar")}/>
        <div class="blob"></div>
      </form>
    </div>
  );
}
