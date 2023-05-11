import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import AdminForm from '../components/AdminForm';
import AdminList from '../components/AdminList';

function Admin() {
  const history = useHistory();

  const handleRedirect = useCallback(() => {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.role === 'customer') history.push('/customer/products');
      if (user.role === 'seller') history.push('/seller/orders');
    }
  }, [history]);

  useEffect(() => {
    handleRedirect();
  }, [handleRedirect]);

  return (
    <div>
      <Header />
      <AdminForm />
      <AdminList />
    </div>
  );
}

export default Admin;
