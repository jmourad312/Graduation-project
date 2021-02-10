import React from "react";
import ContactUsPic from "../../../../components/ContactUsPic";
import LoginButton from "../../../../components/LoginButton";
import UserIcon from "../../../../components/UserIcon";

export default function AboutUs() {
  return (
    <section className="about-us">
      {localStorage.getItem("Authorization") === null && <LoginButton />}
      {localStorage.getItem("Authorization") !== null && <UserIcon />}
      <div className="team-section">
        <h1>Our Team</h1>
        {/* <span className="border"></span>
        <div className="ps">
          <a href="#p1">
            {" "}
            <img src="../../../../assets/Images/person1.jpg" alt="" />{" "}
          </a>
          <a href="#p2">
            {" "}
            <img src="../../../../assets/Images/person1.jpg" alt="" />{" "}
          </a>
          <a href="#p3">
            {" "}
            <img src="../../../../assets/Images/person1.jpg" alt="" />{" "}
          </a>
          <a href="#p4">
            {" "}
            <img src="../../../../assets/Images/person1.jpg" alt="" />{" "}
          </a>
         
        </div> */}
        <div style={{ position: "absolute", left: "10%" }}>
          <ContactUsPic
            name="Youssef Mourad"
            prof="MEARN Full Stack Developer"
            bkImage="../../../../assets/Images/13.jpg"
            prImage="../../../../assets/Images/13.jpg"
          />
        </div>
        <div style={{ position: "absolute", left: "30%" }}>
          <ContactUsPic
            name="Hajar Shalaby"
            prof="MEARN Full Stack Developer"
          />
        </div>
        <div style={{ position: "absolute", left: "50%" }}>
          <ContactUsPic
            name="Mohamed Magdy"
            prof="MEARN Full Stack Developer"
          />
        </div>
        <div style={{ position: "absolute", left: "70%" }}>
          <ContactUsPic name="Nora Alaa" prof="MEARN Full Stack Developer" />
        </div>
        {/* <div className="section" id="p1">
          <span className="name">Hajar Shalby</span>
          <span className="border"></span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            temporibus et inventore, pariatur maxime consequatur veniam cum sint
            ut laboriosam saepe amet animi quaerat qui? Dolorum error id
            possimus ex?
          </p>
        </div>

        <div className="section" id="p2">
          <span className="name">Mohamed Magdy</span>
          <span className="border"></span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            temporibus et inventore, pariatur maxime consequatur veniam cum sint
            ut laboriosam saepe amet animi quaerat qui? Dolorum error id
            possimus ex?
          </p>
        </div>
        <div className="section" id="p3">
          <span className="name">Nora Alaa </span>
          <span className="border"></span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            temporibus et inventore, pariatur maxime consequatur veniam cum sint
            ut laboriosam saepe amet animi quaerat qui? Dolorum error id
            possimus ex?
          </p>
        </div>
        <div className="section" id="p4">
          <span className="name">Yousef Mourad</span>
          <span className="border"></span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            temporibus et inventore, pariatur maxime consequatur veniam cum sint
            ut laboriosam saepe amet animi quaerat qui? Dolorum error id
            possimus ex?
          </p>
        </div> */}
      </div>

      <div className="about-section position-absolute" style={{ top: "60%" }}>
        <div className="inner-container">
          <h1>About Us</h1>
          <p className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            velit ducimus, enim inventore earum, eligendi nostrum pariatur
            necessitatibus eius dicta a voluptates sit deleniti autem error eos
            totam nisi neque voluptates sit deleniti autem error eos totam nisi
            neque.
          </p>
          <div className="skills">
            <span>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
              laborum repudiandae dolorum nulla repellendus quas alias, ea
              excepturi minus soluta amet earum, possimus iusto labore, facere
              perferendis consectetur modi totam.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
