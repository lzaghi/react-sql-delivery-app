import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { requestGetToken } from '../services/requests';

function CheckoutForm() {
  const history = useHistory();
  const [sellers, setSellers] = useState([]);
  const [error, setError] = useState(false);

  const cart = useSelector((state) => state.cart.productsValues);
  const totalCart = Object.values(cart)
    .reduce((acc, curr) => acc + (curr.qtty * curr.price), 0);

  useEffect(() => {
    async function fetchData() {
      try {
        const { token } = JSON.parse(localStorage.getItem('user'));
        const sellersList = await requestGetToken('/users/seller', token);
        setSellers(sellersList);
      } catch (e) {
        const UNAUTHORIZED = 401;
        if (e?.response?.status === UNAUTHORIZED) {
          localStorage.removeItem('user');
          history.push('/login');
        }
        setError(e);
      }
    }
    fetchData();
  }, [history]);

  if (error) {
    <h2>{error?.response?.statusText}</h2>;
  }

  return (
    <div>
      {console.log(sellers)}
      <label htmlFor="seller">
        Vendedor:
        <select data-testid="customer_checkout__select-seller" name="seller" id="seller">
          {
            sellers.map((seller) => (
              <option key={ seller.id } value={ seller.id }>{seller.name}</option>
            ))
          }
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
