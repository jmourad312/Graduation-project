import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom';
import VendorDetails from './VendorBasicDetails/VendorDetails';
import MyItems from './VendorItems/MyItems';
import VendorSettings from './VendorSettings/VendorSettings';
import Loading from '../../../../components/Loading';

export default function ProfileRight(props) {
  return (
    <div className={props.class}>
      <Suspense fallback={<Loading />}>
        <Switch>
          <div className="vendorRightContent">
            <Route path={`/VendorAdministration/VendorDetails/`}>
              <VendorDetails vendor={props.vendor} />
            </Route>
            <Route path={`/VendorAdministration/MyItems/`}>
              <MyItems />
            </Route>
            <Route path={`/VendorAdministration/VendorSettings/`}>
              <VendorSettings />
            </Route>
          </div>
        </Switch>
      </Suspense>
    </div>
  );
}
