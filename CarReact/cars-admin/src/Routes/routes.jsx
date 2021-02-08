import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

const LoginIn = lazy(() => import('../pages/Sign/LoginIn'))

export function Routes() {

    return (

        <Suspense fallback={<div>Loading...</div>} >
                <Switch>
                    <Route  path="/LoginIn" exact component={LoginIn} />
                </Switch>
        </Suspense>
    );
}