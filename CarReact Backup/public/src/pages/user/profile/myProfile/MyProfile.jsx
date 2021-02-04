import React from "react";
import Ads from "../../../../components/Ads";

import ProfileLeft from "../../../../components/ProfileLeft";
import ProfileRight from "../../../../components/ProfileRight";

export default function MyProfile() {
  return (
    <div>
      <Ads class="pater" imgSrc="../../../../assets/Images/13.jpg" hoverImgSrc="../../../../assets/Images/14.jpg"/>
      <section className="myProfile container">
        <div className="row">
          <ProfileLeft class="col-3 profileLeft" />
          <ProfileRight class="col-9 profileright" />
        </div>
      </section>
    </div>
  );
}
