import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

const Home = React.lazy(() => import("../Pages/Home"));
const About = React.lazy(() => import("../Pages/About"));
const Contact = React.lazy(() => import("../Pages/Contact"));
const Counter = React.lazy(() => import("../Pages/Counter"));
const Users = React.lazy(() => import("../Pages/Users"));
const Products = React.lazy(() => import("../Pages/Products"));
const ChangeCont = React.lazy(() => import("../Pages/ChangeCont"));
const GoogleBooks = React.lazy(() => import("../Pages/GoogleBooks"));

export default function Routes() {
  return (
    <Suspense fallback={"Loading"}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/counter" exact component={Counter} />
        <Route path="/users" exact component={Users} />
        <Route path="/products" exact component={Products} />
        <Route path="/changecont" exact component={ChangeCont} />
        <Route path="/books" exact component={GoogleBooks} />
      </Switch>
    </Suspense>
  );
}
