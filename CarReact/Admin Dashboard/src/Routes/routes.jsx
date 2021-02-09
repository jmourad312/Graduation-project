import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

const LoginIn = lazy(() => import('../pages/Sign/LoginIn'))
const Admin = lazy(() => import('../pages/Admin/Admin'))


export function Routes() {

    return (

        <Suspense fallback={<div>Loading...</div>} >
                <Switch>
                    <Route  path="/LoginIn" exact component={LoginIn} />
                    <Route  path="/Admin" exact component={Admin} />
                    <Route  path="/" exact component={Admin} />

                </Switch>
        </Suspense>
    );
}