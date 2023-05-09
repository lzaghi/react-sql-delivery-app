import React from 'react';
import { useSelector } from 'react-redux';

function CheckoutForm() {
  const cart = useSelector((state) => state.cart.productsValues);
  const totalCart = Object.values(cart)
    .reduce((acc, curr) => acc + (curr.qtty * curr.price), 0);
  return (
    <div>
      <label htmlFor="seller">
        Vendedor:
        <select data-testid="customer_checkout__select-seller" name="seller" id="seller">
          <option value="seller1">seller1</option>
        </select>
      </label>
      <label htmlFor="address">
        Endereço:
        <input
          data-testid="customer_checkout__input-address"
          type="text"
          name="address"
          id="address"
        />
      </label>
      <label htmlFor="number">
        Número:
        <input
          data-testid="customer_checkout__input-address-number"
          type="text"
          name="number"
          id="number"
        />
      </label>
      <button
        data-testid="customer_checkout__button-submit-order"
        type="button"
        disabled={ totalCart === 0 }
      >
        Finalizar compra
      </button>
    </div>
  );
}

export default CheckoutForm;
