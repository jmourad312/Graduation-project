import React from "react";
import ContactUsPic from "../../../../components/ContactUsPic";
import LoginButton from "../../../../components/LoginButton";
import UserIcon from "../../../../components/UserIcon";

export default function AboutUs() {
  return (
    <section className="about-us">
      {/* {localStorage.getItem("Authorization") === null && <LoginButton />} */}
      {localStorage.getItem("Authorization") !== null && <UserIcon />}
      <div className="team-section">
        <h1
          style={{ fontWeight: "700", fontSize: "50px", fontFamily: "cursive", backgroundImage: "linear-gradient(to top, #08091d 0%, #a2a5a8 70%)", color: "transparent", WebkitBackgroundClip: "text" }}
        >
          Our Team
        </h1>
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

        <div style={{ position: "absolute", left: "10%", top: "4%" }}>
          <ContactUsPic
            name="Hajar Shalaby"
            prof="MEARN Full Stack Developer"
          />
        </div>
        <div style={{ position: "absolute", left: "30%", top: "4%" }}>
          <ContactUsPic
            name="Mohamed Magdy"
            prof="MEARN Full Stack Developer"
          />
        </div>
        <div style={{ position: "absolute", left: "50%", top: "4%" }}>
          <ContactUsPic name="Nora Alaa" prof="MEARN Full Stack Developer" />
        </div>
        <div style={{ position: "absolute", left: "70%", top: "4%" }}>
          <ContactUsPic
            name="Youssef Mourad"
            prof="MEARN Full Stack Developer"
            bkImage="../../../../assets/Images/13.jpg"
            prImage="../../../../assets/Images/13.jpg"
          />
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

      <div className="about-section position-absolute" style={{ top: "53%" }}>
        <div className="inner-container">
          <h1 style={{
            fontWeight: "800", fontSize: "30px",
            fontFamily: "cursive",
            backgroundImage:
              "linear-gradient(to top, #08091d 0%, #a2a5a8 100%)",
            color: "transparent",
            WebkitBackgroundClip: "text",
          }}>About Us</h1>
          <p className="text" style={{
            fontWeight: "600",
            fontFamily: "cursive",
            backgroundImage:
              "linear-gradient(to top, #08091d 70%, #a2a5a8 100%)",
            color: "transparent",
            WebkitBackgroundClip: "text",
          }}>
            We are a highly skilled group of MEARN Full Stack Developers, we
            enjoy coding and bringing new concepts and projects to life.
          </p>
          <div className="skills" style={{
            fontWeight: "600",
            fontFamily: "cursive",
            backgroundImage:
              "linear-gradient(to top, #08091d 80%, #a2a5a8 100%)",
            color: "transparent",
            WebkitBackgroundClip: "text",
          }}>
            <span>
              We are highly trained graduates from the Information and
              Technology Institute or "ITI" for short, and we are ready for any
              project, we are a perfect asset to any company or team, please
              feel free to reach out to us so that we can assist you with any
              project you'd want.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
