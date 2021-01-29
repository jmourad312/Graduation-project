import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

const Login = React.lazy(() => import("./login/Login"));
const Logout = React.lazy(() => import("./logout/Logout"));
const ResetPassword = React.lazy(() => import("./resetPassword/ResetPassword"));
const SignUp = React.lazy(() => import("./signUp/SignUp"));

export default function Routes() {
  return (
    <Suspense fallback={"Loading"}>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/auth/logout" exact component={Logout} />
        <Route path="/auth/reset" exact component={ResetPassword} />
        <Route path="/auth/register" exact component={SignUp} />
      </Switch>
    </Suspense>
  );
}
