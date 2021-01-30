import React from "react";

export default function ResetPassword() {
  return (
    <section className="reset-password">
      <div className="pen-title">
        <h1>Reset Password</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <img
              src="../../../../../assets/Images/forgot-password-icon.svg"
              alt="..."
            />
          </div>

          <div className="col-lg-8">
            <div className="container">
              <div className="card"></div>
              <div className="card">
                <h1 className="title">Verify Email !</h1>
                <form>
                  <div className="input-container">
                    <input type="#{type}" id="#{label}" required="required" />
                    <label for="#{label}">Email Address...</label>
                    <div className="bar"></div>
                  </div>
                  <div className="button-container">
                    <button className="btn">
                      <span>Confirm</span>
                    </button>
                  </div>
                </form>
              </div>
              <div className="card alt">
                <div className="toggle"></div>
                <h1 className="title">
                  Set password<div className="close"></div>
                </h1>
                <form>
                  <div className="input-container">
                    <input type="#{type}" id="#{label}" required="required" />
                    <label for="#{label}">Password</label>
                    <div className="bar"></div>
                  </div>
                  <div className="input-container">
                    <input type="#{type}" id="#{label}" required="required" />
                    <label for="#{label}">Confirm Password</label>
                    <div className="bar"></div>
                  </div>
                  <div className="button-container">
                    <button>
                      <span>Submit</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
