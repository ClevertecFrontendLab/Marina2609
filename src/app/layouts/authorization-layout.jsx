import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const LayoutAuthentication = () => {
  const navigation = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigation('/books/all');
    }
  }, [navigation, token]);

  return <Outlet />;
};
