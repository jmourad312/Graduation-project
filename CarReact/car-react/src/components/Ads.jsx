import React from 'react'

export default function Ads(props) {
    return (
      <div className={"adsComp"}>
        <a
          href={props.link}
          rel="nofollow"
          className="pater"
          //   onClick="recordOutboundLink(this, 'Outbound Links', 'SenchaCodrops141117');return false;"
        >
          <img
            className="pater__logo"
            src={props.imgSrc}
            alt={props.imgAlt}
            width="300px"
            height="100px"
          />
          <h2 className="pater__title">{props.value}</h2>
          <div className="pater__img-wrap">
            <img
              width="300px"
              height="232px"
              className="pater__img"
              src={props.hoverImgSrc}
              alt={props.hoverImgAlt}
            />
          </div>
        </a>
      </div>
    );
}
