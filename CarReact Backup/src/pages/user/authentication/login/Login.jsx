import React from 'react'

export default function Login() {
    return (
      <section className="login-component">
        <div className="container jumbotron login-wrapper jagged-edges">
          <div className="right-style"></div>
          <div className="left-style"></div>
          <div className="row pr-4 pl-4">
            <div className="col-md-6">
              <img
                src="https://html.merku.love/rotors/assets/images/about/img_03.jpg"
                style={{ width: "100%" }}
                alt=""
              />
            </div>
            <div className="col-md-6">
              <h2>Login</h2>or{" "}
              <span>
                <a routerLink="/signup">Create Account</a>
              </span>
              {/* <!-- Login Form --> */}
              {/* <form [formGroup]="form"> */}
              <form>
                <label>
                  <input
                    type="email"
                    formControlName="Email"
                    className="form-control"
                    name="login"
                    placeholder="Email"
                  />
                </label>

                {/* <div *ngIf="form.controls['Email'].dirty && form.controls['Email'].touched">
                <small className="text-danger" *ngIf="form.controls['Email'].hasError('required')">You Should Enter Email address</small>
                <small className="text-danger" *ngIf="form.controls['Email'].hasError('pattern')">Email address is invalid format</small>
              </div> */}

                <br />
                <label>
                  <input
                    type="password"
                    className="form-control"
                    name="login"
                    placeholder="password"
                  />
                </label>
                <br />
                <input
                  type="submit"
                  className="btn btn-danger"
                  style={{ width: "100%" }}
                  value="Log In"
                />
              </form>
              <br />
              <a href="#">Forget Password</a>
              <br />
              <br />
              <div className="row">
                <div className="col-md-4">Login with</div>
                <div className="col-md-8">
                  <button
                    className="btn btn-danger mr-1"
                    style={{ width: "40%" }}
                  >
                    Google
                  </button>
                  <button className="btn btn-primary" style={{ width: "40%" }}>
                    Facebook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}
