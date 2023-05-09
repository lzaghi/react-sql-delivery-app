import React from 'react';
import Header from '../components/Header';
import CheckoutTable from '../components/CheckoutTable';
import CheckoutForm from '../components/CheckoutForm';

function Checkout() {
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
