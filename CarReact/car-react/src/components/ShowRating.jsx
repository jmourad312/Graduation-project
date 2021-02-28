import React, { useState } from 'react';
import {useTranslation} from "react-i18next";

export default function ShowRating(props) {
    const [checked, setChecked] = useState("fa fa-star checked1");
    const [notChecked] = useState("fa fa-star");
    const {t, i18n} = useTranslation();
    return (
      <>
        {props.rating === 0 ? (
          <span> {t("product.products Details.Not Rated")}</span>
        ) : (
          <>
            <span className={props.rating >= 1 ? checked : notChecked}></span>
            <span className={props.rating >= 2 ? checked : notChecked}></span>
            <span className={props.rating >= 3 ? checked : notChecked}></span>
            <span className={props.rating >= 4 ? checked : notChecked}></span>
            <span className={props.rating === 5 ? checked : notChecked}></span>
          </>
        )}
      </>
    );
}
