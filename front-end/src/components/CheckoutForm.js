import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { requestGetWithToken, requestPostWithToken } from '../services/requests';

function CheckoutForm() {
  const history = useHistory();
  const [sellers, setSellers] = useState([]);
  const [error, setError] = useState(false);
  const [userInfo, setUserInfo] = useState({
    address: '',
    number: '',
  });
  const [selectedSellerId, setSelectedSellerId] = useState('');

  const cart = useSelector((state) => state.cart.productsValues);
  const totalCart = Object.values(cart)
    .reduce((acc, curr) => acc + (curr.qtty * curr.price), 0);

  const handleInputsChange = ({ target }) => {
    setUserInfo({
      ...userInfo,
      [target.name]: target.value,
    });
  };

  const user = useSelector((state) => state.user);

  const handleNewSale = async () => {
    const body = {
      userId: user.id,
      sellerId: selectedSellerId,
      totalPrice: totalCart,
      deliveryAddress: userInfo.address,
      deliveryNumber: userInfo.number,
    };
    const { token } = JSON.parse(localStorage.getItem('user'));
    try {
      const newSale = await requestPostWithToken('/sales', body, token);
      console.log(newSale);
      history.push(`/customer/orders/${newSale.id}`);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { token } = JSON.parse(localStorage.getItem('user'));
        const sellersList = await requestGetWithToken('/users/seller', token);
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
      <label htmlFor="seller">
        Vendedor:
        <select
          data-testid="customer_checkout__select-seller"
          name="seller"
          id="seller"
          value={ selectedSellerId }
          onChange={ (e) => setSelectedSellerId(e.target.value) }
        >
          <option value="" disabled hidden>Selecionar</option>
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
          value={ userInfo.address }
          onChange={ (e) => handleInputsChange(e) }
        />
      </label>
      <label htmlFor="number">
        Número:
        <input
          data-testid="customer_checkout__input-address-number"
          type="number"
          name="number"
          id="number"
          value={ userInfo.number }
          onChange={ (e) => handleInputsChange(e) }
        />
      </label>
      <button
        data-testid="customer_checkout__button-submit-order"
        type="button"
        disabled={
          totalCart === 0
          || userInfo.address === '' || userInfo.number === '' || selectedSellerId === ''
        }
        onClick={ () => handleNewSale() }
      >
        Finalizar compra
      </button>
    </div>
  );
}

export default CheckoutForm;
