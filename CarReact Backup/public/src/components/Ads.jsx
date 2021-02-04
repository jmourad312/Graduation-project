import React from 'react'

export default function Ads(props) {
    return (
      <div className={"adsComp"}>
        <a
          href={props.link}
          
          rel="nofollow"
          className={props.class}
          //   onClick="recordOutboundLink(this, 'Outbound Links', 'SenchaCodrops141117');return false;"
        >
          <img className="pater__logo" src={props.imgSrc} alt={props.imgAlt} />
          <h2 className="pater__title">
            {props.value}
          </h2>
          <div className="pater__img-wrap">
            <img
              className="pater__img"
              src={props.hoverImgSrc}
              alt={props.hoverImgAlt}
            />
          </div>
        </a>
      </div>
    );
}
