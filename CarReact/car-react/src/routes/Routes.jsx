import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Loading from "../components/Loading";

// const AuthRoutes = React.lazy(() => import("../pages/user/authentication/AuthRoutes"));
const Homepage2 = React.lazy(() => import("../layout/Homepage/Homepage2"));


const Login = React.lazy(() =>
  import("../pages/user/authentication/login/Login")
);

const SignUp = React.lazy(() =>
  import("../pages/user/authentication/signUp/SignUp")
);
const AddBlog = React.lazy(() =>
  import("../pages/user/blog/addBlog/AddBlog.jsx")
);
const BlogDetails = React.lazy(() =>
  import("../pages/user/blog/blogDetails/BlogDetails.jsx")
);
const BlogList = React.lazy(() =>
  import("../pages/user/blog/blogList/BlogList")
);
const AboutUs = React.lazy(() => 
  import("../pages/user/info/aboutUs/AboutUs.jsx")
);
const ContactUs = React.lazy(() =>
  import("../pages/user/info/contactUs/ContactUs")
);
const Privacy = React.lazy(() => import("../pages/user/info/privacy/Privacy"));
const TermsOfService = React.lazy(() =>
  import("../pages/user/info/termsOfService/TermsOfService")
);
const VendorProfileUser = React.lazy(() =>
  import("../pages/user/info/vendor/VendorProfileUser")
);
const ProductDetails = React.lazy(() =>
  import("../pages/user/product/productDetails/ProductDetails")
);
const ProductsList = React.lazy(() =>
  import("../pages/user/product/productList/ProductsList")
);
const DisplayUserProfile = React.lazy(() =>
  import("../pages/user/profile/displayProfile/DisplayUserProfile")
);
const MyProfile = React.lazy(() =>
  import("../pages/user/profile/myProfile/MyProfile")
);
const Signform = React.lazy(() =>
  import("../pages/user/authentication/signform/signform")
);
const SignChoice = React.lazy(() =>
  import("../pages/user/authentication/signFormChoice/SignChoice")
);
const VendorSignForm = React.lazy(() =>
  import("../pages/user/authentication/vendorSignForm/VendorSignForm")
);




// const Contact = React.lazy(() => import("../Pages/Contact"));
// const Counter = React.lazy(() => import("../Pages/Counter"));
// const Users = React.lazy(() => import("../Pages/Users"));
// const Products = React.lazy(() => import("../Pages/Products"));
// const ChangeCont = React.lazy(() => import("../Pages/ChangeCont"));
// const GoogleBooks = React.lazy(() => import("../Pages/GoogleBooks"));

export default function Routes() {
  return (
    <Suspense fallback={<Loading/>}>
      <Switch>
        <Route path="/" exact component={Homepage2} />
        <Route path="/login" exact component={Login} />
        <Route path="/SignUp" exact component={SignUp} />
        <Route path="/AddBlog" exact component={AddBlog} />
        <Route path="/BlogDetails" exact component={BlogDetails} />
        <Route path="/BlogList" exact component={BlogList} />
        <Route path="/AboutUs" exact component={AboutUs} />
        <Route path="/ContactUs" exact component={ContactUs} />
        <Route path="/Privacy" exact component={Privacy} />
        <Route path="/TermsOfService" exact component={TermsOfService} />
        <Route path="/VendorProfileUser" exact component={VendorProfileUser} />
        <Route path="/ProductDetails" exact component={ProductDetails} />
        <Route path="/ProductsList" exact component={ProductsList} />
        <Route path="/MyProfile/(page)?" component={MyProfile} />
        <Route path="/SignForm" exact component={Signform} />
        <Route path="/VendorSignForm" exact component={VendorSignForm} />
        <Route path="/SignChoice" exact component={SignChoice} />

        <Route
          path="/DisplayUserProfile"
          exact
          component={DisplayUserProfile}
        />
      </Switch>
    </Suspense>
  );
}
