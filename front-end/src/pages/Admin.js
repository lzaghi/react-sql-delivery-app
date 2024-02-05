import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import AdminForm from '../components/AdminForm';
import AdminList from '../components/AdminList';
import styles from '../css/Admin.module.css';

function Admin() {
  const history = useHistory();

  const handleRedirect = useCallback(() => {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.role === 'customer') history.push('/customer/products');
      if (user.role === 'seller') history.push('/seller/orders');
    } else {
      history.push('/login');
    }
  }, [history]);

  useEffect(() => {
    handleRedirect();
  }, [handleRedirect]);

  return (
    <div>
      <Header />
      <div className={ styles.container }>
        <h2>Formulário de Cadastro</h2>
        <AdminForm />
        <AdminList />
      </div>
    </div>
  );
}

export default Admin;
