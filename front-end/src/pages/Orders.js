import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import SaleCard from '../components/SaleCard';
import { requestGetWithToken } from '../services/requests';
import '../style/Orders.css';

function Orders() {
  const history = useHistory();
  const { location: { pathname } } = history;

  const [sales, setSales] = useState([]);
  const [error, setError] = useState(false);

  let endpoint = '';
  if (pathname.includes('customer')) {
    endpoint = 'user';
  } else if (pathname.includes('seller')) {
    endpoint = 'seller';
  }

  const handleRedirect = useCallback(() => {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.role === 'administrator') history.push('/admin/manage');
    } else {
      history.push('/login');
    }
  }, [history]);

  useEffect(() => {
    handleRedirect();

    let isMounted = true;
    async function fetchData() {
      try {
        const { token } = JSON.parse(localStorage.getItem('user'));
        const salesList = await requestGetWithToken(`/sales/${endpoint}`, token);
        if (isMounted) setSales(salesList);
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
  }, [history, endpoint, handleRedirect]);

  if (error) {
    <h2>{error?.response?.statusText}</h2>;
  }

  return (
    <div>
      <Header />
      <div className="orders">
        { !sales.length
          ? <p>Ainda não há pedidos!</p>
          : (
            sales.map((sale, index) => (
              <SaleCard
                key={ sale.id }
                props={ { sale, index } }
              />
            ))
          )}
      </div>
    </div>
  );
}

export default Orders;
