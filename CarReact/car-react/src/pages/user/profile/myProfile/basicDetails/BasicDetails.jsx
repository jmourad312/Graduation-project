import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";


export default function BasicDetails(props) {
  // const user = useSelector(state => state.user)

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        class="container emp-profile"
        initial="out"
        animate="in"
        exit="out"
        variants={props.variants}
        transition={props.transition}
      >
        <div class="tab-content profile-tab" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div class="row">
              <div class="col-3">
                <label>First Name</label>
              </div>
              <div class="col-9">
                <p>{props.person.firstName}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>Middle Name:</label>
              </div>
              <div class="col-md-6">
                <p>{props.person.middleName}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>Name</label>
              </div>
              <div class="col-md-6">
                <p>{props.person.lastName}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>Email</label>
              </div>
              <div class="col-md-6">
                <p>{props.person.email}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>Phone</label>
              </div>
              <div class="col-md-6">
                <p>{props.person.phoneNumber}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>Profession</label>
              </div>
              <div class="col-md-6">
                <p>Web Developer and Designer</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
