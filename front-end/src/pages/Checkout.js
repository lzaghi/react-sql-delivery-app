import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import CheckoutTable from '../components/CheckoutTable';
import CheckoutForm from '../components/CheckoutForm';
import '../style/Checkout.css';

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
      <div className="checkout">
        <h2>Resumo do pedido</h2>
        <CheckoutTable />
        <h2>Informações para entrega</h2>
        <CheckoutForm />
      </div>
    </div>
  );
}

export default Checkout;
