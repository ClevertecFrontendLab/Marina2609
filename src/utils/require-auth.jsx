import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { AppLayout } from '../app/layouts/app-layout';

export const PrivateRoute = () => {
  // const [auth, setAyth] = useState({ token: localStorage.getItem('token') });

  // useEffect(() => {
  //   console.log(auth);
  //   if (auth.token) {
  //     <AppLayout />;
  //   } else {
  //     <Navigate to='/auth' replace={true} />;
  //   }
  // }, [auth]);

  // return auth.token ? <AppLayout /> : <Navigate to='/auth' replace={true} />;
  const auth = { token: localStorage.getItem('token') };

  return auth.token ? <AppLayout /> : <Navigate to='/auth' />;
};
