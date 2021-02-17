import { AnimatePresence, motion } from 'framer-motion';
import React from 'react'

export default function VendorDetails(props) {
    return (
      <AnimatePresence exitBeforeEnter>
        <motion.div
          className="container emp-profile"
          initial="out"
          animate="in"
          exit="out"
          variants={props.variants}
          transition={props.transition}
        >
          <form method="post">
            <div className="row mt-5">
              <div className="col-md-2"></div>
              <div className="col-md-10">
                <div className="tab-content profile-tab" id="myTabContent">
                  <div
                    className="tab-pane fade show active text-white"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label>User Id</label>
                      </div>
                      <div className="col-md-6">
                        <p>Anonymous User</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>First Name</label>
                      </div>
                      <div className="col-md-6">
                        <p>{props.vendor.firstName}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Middle Name</label>
                      </div>
                      <div className="col-md-6">
                        <p>{props.vendor.middleName}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Last Name</label>
                      </div>
                      <div className="col-md-6">
                        <p>{props.vendor.lastName}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Email</label>
                      </div>
                      <div className="col-md-6">
                        <p>{props.vendor.email}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Phone</label>
                      </div>
                      <div className="col-md-6">
                        <p>
                          {props.vendor.phoneNumber
                            ? props.vendor.phoneNumber
                            : "not provided by vendor"}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Profession</label>
                      </div>
                      <div className="col-md-6">
                        <p>Web Developer and Designer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    );
}
