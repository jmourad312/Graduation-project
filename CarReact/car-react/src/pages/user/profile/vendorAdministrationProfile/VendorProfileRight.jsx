import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom';
import VendorDetails from './VendorBasicDetails/VendorDetails';
import MyItems from './VendorItems/MyItems';
import VendorSettings from './VendorSettings/VendorSettings';
import Loading from '../../../../components/Loading';
import { AnimatePresence } from 'framer-motion';

export default function ProfileRight(props) {
  const pageVariants = {
    in: {
      opacity: 1,
      y: "0vh",
      scale: 1,
    },
    out: {
      opacity: -1,
      y: "-80vh",
      scale: 0.6,
    },
  };
  const pageTransitions = {
    duration: 1.3,
    type: "tween",
    ease: "easeIn",
  };
  return (
    <div className={props.class}>
      <Suspense fallback={<Loading />}>
        <AnimatePresence exitBeforeEnter>
          <Switch>
            <div className="vendorRightContent">
              <Route path={`/VendorAdministration/VendorDetails/`}>
                <VendorDetails vendor={props.vendor} variants={pageVariants} transition={pageTransitions}/>
              </Route>
              <Route path={`/VendorAdministration/MyItems/`}>
                <MyItems variants={pageVariants} transition={pageTransitions}/>
              </Route>
              <Route path={`/VendorAdministration/VendorSettings/`}>
                <VendorSettings variants={pageVariants} transition={pageTransitions}/>
              </Route>
            </div>
          </Switch>
        </AnimatePresence>
      </Suspense>
    </div>
  );
}
