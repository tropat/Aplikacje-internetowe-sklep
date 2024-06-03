import React from 'react';
import MyPackagesHistory from '../components/MyPackagesHistory';

const MyPackagesPage = ({auth, delivererId}) => (
  <div>
    <MyPackagesHistory token={auth.accessToken} delivererId={delivererId}/>
  </div>
);

export default MyPackagesPage;
