import React from 'react';
import {useTranslation} from "react-i18next";

export default function Logo() {
  const {t, i18n} = useTranslation();
    return (
      <div className="logo" style={{marginLeft:"50px"}}>
        <div style={{fontWeight:"700"}}> {t('logo')}</div>
        <div>
          <span style={{fontWeight:"500"}}>{t('slogan')}</span>
        </div>
      </div>
    );
}
