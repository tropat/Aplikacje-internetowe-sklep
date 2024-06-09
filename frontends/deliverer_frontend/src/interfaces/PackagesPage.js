import React from 'react';
import PackagesHistory from '../components/PackagesHistory';

const PackagesPage = ({auth}) => (
  <div>
    <PackagesHistory auth={auth}/>
  </div>
);

export default PackagesPage;
