import React from 'react';
import PackagesHistory from '../components/PackagesHistory';

const PackagesPage = ({auth, delivererId}) => (
  <div>
    <PackagesHistory token={auth.accessToken} delivererId={delivererId}/>
  </div>
);

export default PackagesPage;
