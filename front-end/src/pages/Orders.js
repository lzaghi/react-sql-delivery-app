import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import SaleCard from '../components/SaleCard';
import Loading from '../components/Loading';
import { requestGetWithToken } from '../services/requests';
import styles from '../css/Orders.module.css';

function Orders() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const userName = useSelector((state) => state.user.name);

  const [sales, setSales] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    }
    fetchData();

    return () => { isMounted = false; };
  }, [history, endpoint, handleRedirect]);

  if (error) {
    return <h2>{error.response?.statusText || 'Algo deu errado!'}</h2>;
  }

  return (
    <div>
      <Header />
      {
        loading
          ? <div className={ styles.loading }><Loading /></div>
          : (
            <div className={ styles.orders }>
              {
                endpoint === 'seller' && (
                  <h2 className={ styles.title }>{`Vendas de ${userName}`}</h2>
                )
              }
              { !sales.length
                ? <p className={ styles.noOrders }>Ainda não há pedidos!</p>
                : (
                  [...sales].reverse().map((sale, index) => (
                    <SaleCard
                      key={ sale.id }
                      props={ { sale, index } }
                    />
                  ))
                )}
            </div>)
      }
    </div>
  );
}

export default Orders;
