import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { requestGetWithToken, requestPatchWithToken } from '../services/requests';
import DetailsTable from '../components/DetailsTable';
import '../style/Details.css';

function Details() {
  const [sale, setSale] = useState({});
  const [error, setError] = useState(false);
  const [status, setStatus] = useState('');

  const history = useHistory();
  const { location: { pathname } } = history;
  const { id } = useParams();

  const [date, setDate] = useState('');

  let ROUTE = '';
  if (pathname.includes('customer')) {
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

  const handleStatusChange = async (newStatus) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'));
      await requestPatchWithToken(`/sales/${sale.id}`, { newStatus }, token);
      setStatus(newStatus);
    } catch (e) {
      const UNAUTHORIZED = 401;
      if (e?.response?.status === UNAUTHORIZED) {
        localStorage.removeItem('user');
        history.push('/login');
      }
      setError(e);
    }
  };

  const handleRedirect = useCallback(() => {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.role === 'administrator') history.push('/admin/manage');
    }
  }, [history]);

  useEffect(() => {
    handleRedirect();

    let isMounted = true;
    async function fetchData() {
      try {
        const { token } = JSON.parse(localStorage.getItem('user'));
        const saleDetails = await requestGetWithToken(`/sales/details/${id}`, token);
        if (isMounted) {
          setSale(saleDetails);
          setStatus(saleDetails.status);
          handleDate(saleDetails.saleDate);
        }
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

    return () => { isMounted = false; };
  }, [history, id, handleRedirect]);

  if (error) {
    return <h2>{error.response?.statusText || 'Algo deu errado!'}</h2>;
  }

  return (
    <div>
      <Header />
      <div className="details">
        <h2>Detalhes do pedido</h2>
        <div className="details-sale">
          {
            !!Object.keys(sale).length && (
              <div>
                <p
                  data-testid={ `${ROUTE}element-order-details-label-order-id` }
                >
                  <b>Número do pedido: </b>
                  {sale.id}
                </p>
                { (pathname.includes('customer')) && (
                  <p
                    data-testid={ `${ROUTE}element-order-details-label-seller-name` }
                  >
                    <b>Vendedor(a): </b>
                    {sale.seller.name}
                  </p>)}
                <p
                  data-testid={ `${ROUTE}element-order-details-label-order-date` }
                >
                  <b>Data: </b>
                  {date}
                </p>
                <div className="details-status">
                  <p
                    data-testid={
                      `${ROUTE}element-order-details-label-delivery-status-${id}`
                    }
                  >
                    <b>Status: </b>
                    {status}
                  </p>
                  { (pathname.includes('customer')) && (
                    <button
                      data-testid={ `${ROUTE}button-delivery-check` }
                      type="button"
                      disabled={ status !== 'Em Trânsito' }
                      onClick={ () => handleStatusChange('Entregue') }
                    >
                      Marcar como entregue
                    </button>)}
                  { (pathname.includes('seller')) && (
                    <button
                      data-testid={ `${ROUTE}button-preparing-check` }
                      type="button"
                      disabled={ status !== 'Pendente' }
                      onClick={ () => handleStatusChange('Preparando') }
                    >
                      Preparar pedido
                    </button>)}
                  { (pathname.includes('seller')) && (
                    <button
                      className="dispatched-button"
                      data-testid={ `${ROUTE}button-dispatch-check` }
                      type="button"
                      disabled={ status !== 'Preparando' }
                      onClick={ () => handleStatusChange('Em Trânsito') }
                    >
                      Saiu para entrega
                    </button>)}
                </div>
              </div>
            )
          }
        </div>
        <DetailsTable props={ sale } />
      </div>
    </div>
  );
}

export default Details;
