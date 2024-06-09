import React from 'react';
import MyPackagesHistory from '../components/MyPackagesHistory';

const MyPackagesPage = ({auth}) => (
  <div>
    <MyPackagesHistory auth={auth} />
  </div>
);

export default MyPackagesPage;
