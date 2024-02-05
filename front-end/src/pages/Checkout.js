import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import CheckoutTable from '../components/CheckoutTable';
import CheckoutForm from '../components/CheckoutForm';
import styles from '../css/Checkout.module.css';

function Checkout() {
  const history = useHistory();

  const handleRedirect = useCallback(() => {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.role === 'seller') history.push('/seller/orders');
      if (user.role === 'administrator') history.push('/admin/manage');
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
        <h2 className={ styles.resumo }>Resumo do pedido</h2>
        <CheckoutTable />
        <CheckoutForm />
      </div>
    </div>
  );
}

export default Checkout;
