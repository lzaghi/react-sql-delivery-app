import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { requestGetWithToken } from '../services/requests';
import DetailsTable from '../components/DetailsTable';

function Details() {
  const ROUTE = 'customer_order_details__element-order';

  const [sale, setSale] = useState({});
  const [error, setError] = useState(false);

  const history = useHistory();
  const { id } = useParams();

  const [date, setDate] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

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
              data-testid={ `${ROUTE}-details-label-order-id` }
            >
              {sale.id}
            </span>
            <span
              data-testid={ `${ROUTE}-details-label-seller-name` }
            >
              {sale.seller.name}
            </span>
            <span
              data-testid={ `${ROUTE}-details-label-order-date` }
            >
              {date}
            </span>
            <span
              data-testid={ `${ROUTE}-details-label-delivery-status-${id}` }
            >
              {sale.status}
            </span>
            <button
              data-testid="customer_order_details__button-delivery-check"
              type="button"
              disabled={ user.role === 'customer' }
            >
              Marcar como entregue
            </button>
          </div>
        )
      }
      <DetailsTable props={ sale } />
    </div>
  );
}

export default Details;
