import React from "react";

import ProfileLeft from "../../../../components/ProfileLeft";
import ProfileRight from "../../../../components/ProfileRight";


export default function MyProfile() {
  return (
    <section className="myProfile container">
      <div className="row">
        <ProfileLeft class="col-lg-3 profileLeft" />
        <ProfileRight class="col-lg-9 profileright" />
      </div>
    </section>
  );
}
