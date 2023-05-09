import React from 'react';
import Header from '../components/Header';
import CheckoutTable from '../components/CheckoutTable';

function Checkout() {
  return (
    <div>
      <Header />
      <h2>Finalizar pedido</h2>
      <CheckoutTable />
    </div>
  );
}

export default Checkout;
