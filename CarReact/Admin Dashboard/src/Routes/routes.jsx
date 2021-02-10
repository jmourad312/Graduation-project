import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { GuardProvider, GuardedRoute } from 'react-router-guards';


const LoginIn = lazy(() => import('../pages/Sign/LoginIn'))
const Admin = lazy(() => import('../pages/Admin/Admin'))
const EditUser = lazy(() => import('../pages/Edit/Model'))



export function Routes() {

    const requireLogin = (to, from, next) => {
        if (to.meta.auth) {
            if (getIsLoggedIn()) {
                next();
            }
            next.redirect('/LoginIn');
        } else {
            next();
        }
    };

    const getIsLoggedIn = () => {
        const InLocalStorage = localStorage.getItem('Authorization');
        if (InLocalStorage === undefined || InLocalStorage === '' || InLocalStorage === null) return false;

        else return true;
    }

    return (

        <Suspense fallback={<div>Loading...</div>} >
            <GuardProvider guards={[requireLogin]}>
                <Switch>
                    <GuardedRoute path="/LoginIn" exact component={LoginIn} />
                    <GuardedRoute path="/Admin" exact component={Admin} meta={{ auth: true }} />
                    <GuardedRoute path="/" exact component={Admin} meta={{ auth: true }} />
                    <GuardedRoute path="/EditUser" exact component={EditUser} meta={{ auth: true }} />

                </Switch>
            </GuardProvider>
        </Suspense>
    );
}