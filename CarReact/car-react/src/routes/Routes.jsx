import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
// import AddYourAds from "../components/AddYourAds";
import Loading from "../components/Loading";

const Homepage2 = React.lazy(() => import("../layout/Homepage/Homepage2"));


const AddYourAds = React.lazy(() =>
  import("../components/AddYourAds")
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
const VendorAdministration = React.lazy(() =>
  import("../pages/user/profile/vendorAdministrationProfile/VendorAdministration")
);



export default function Routes() {
  
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/" exact component={Homepage2} />

        <Route path="/BlogDetails/:id?" exact>
          <BlogDetails />
          <AddYourAds />
        </Route>

        <Route path="/BlogList" exact>
          <BlogList />
          <AddYourAds />
        </Route>

        <Route path="/AboutUs" exact component={AboutUs} />
        <Route path="/ContactUs" exact component={ContactUs} />
        <Route path="/VendorProfileUser/:id" exact>
          <VendorProfileUser />
          <AddYourAds />
        </Route>
        <Route path="/ProductDetails/:id" exact>
          <ProductDetails /> <AddYourAds />
        </Route>
        <Route path="/ProductsList" exact>
          <ProductsList /> <AddYourAds />
        </Route>

        <Route path="/MyProfile/(page)?" component={MyProfile} />

        <Route path="/SignForm" exact component={Signform} />
        <Route path="/VendorSignForm" exact component={VendorSignForm} />
        <Route path="/SignChoice" exact component={SignChoice} />
        <Route
          path="/VendorAdministration/(page)?"
          component={VendorAdministration}
        />
      </Switch>
    </Suspense>
  );
}
