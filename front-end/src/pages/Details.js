import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { requestGetWithToken } from '../services/requests';
import DetailsTable from '../components/DetailsTable';

function Details() {
  const [sale, setSale] = useState({});
  const [error, setError] = useState(false);

  const history = useHistory();
  const { location: { pathname } } = history;
  const { id } = useParams();

  const [date, setDate] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  let ROUTE = '';
  if (pathname.includes('user')) {
    ROUTE = 'customer_order_details__';
  } else if (pathname.includes('seller')) {
    ROUTE = 'seller_order_details__';
  }

  const handleDate = (dbDate) => {
    const newDate = new Date(dbDate);

    const day = newDate.getDate();
    let month = newDate.getMonth() + 1; // Months are zero-based, so we add 1
    if (String(month).length === 1) month = `0${month}`;
    const year = newDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    setDate(formattedDate);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { token } = JSON.parse(localStorage.getItem('user'));
        const saleDetails = await requestGetWithToken(`/sales/details/${id}`, token);
        setSale(saleDetails);
        handleDate(saleDetails.saleDate);
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
  }, [history, id]);

  if (error) {
    <h2>{error?.response?.statusText}</h2>;
  }

  return (
    <div>
      {console.log(sale)}
      <Header />
      {
        Object.keys(sale).length && (
          <div>
            <span
              data-testid={ `${ROUTE}element-order-details-label-order-id` }
            >
              {sale.id}
            </span>
            { (pathname.includes('user')) && (
              <span
                data-testid={ `${ROUTE}element-order-details-label-seller-name` }
              >
                {sale.seller.name}
              </span>)}
            <span
              data-testid={ `${ROUTE}element-order-details-label-order-date` }
            >
              {date}
            </span>
            <span
              data-testid={ `${ROUTE}element-order-details-label-delivery-status-${id}` }
            >
              {sale.status}
            </span>
            { (pathname.includes('user')) && (
              <button
                data-testid={ `${ROUTE}button-delivery-check` }
                type="button"
                disabled={ user.role === 'customer' }
              >
                Marcar como entregue
              </button>)}
            { (pathname.includes('seller')) && (
              <button
                data-testid={ `${ROUTE}button-preparing-check` }
                type="button"
              >
                Preparar pedido
              </button>)}
            { (pathname.includes('seller')) && (
              <button
                data-testid={ `${ROUTE}button-dispatch-check` }
                type="button"
                disabled
              >
                Saiu para entrega
              </button>)}
          </div>
        )
      }
      <DetailsTable props={ sale } />
    </div>
  );
}

export default Details;
