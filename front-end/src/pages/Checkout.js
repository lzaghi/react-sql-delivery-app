import React, { useCallback } from 'react';
import Header from '../components/Header';
import CheckoutTable from '../components/CheckoutTable';
import CheckoutForm from '../components/CheckoutForm';

function Checkout() {
  const history = useHistory();

  const handleRedirect = useCallback(() => {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.role === 'seller') history.push('/seller/orders');
      if (user.role === 'administrator') history.push('/admin/manage');
    }
  }, [history]);

  useEffect(() => {
    handleRedirect();
  }, [handleRedirect]);

  return (
    <div>
      <Header />
      <h2>Finalizar pedido</h2>
      <CheckoutTable />
      <h2>Informações para entrega</h2>
      <CheckoutForm />
    </div>
  );
}

export default Checkout;
