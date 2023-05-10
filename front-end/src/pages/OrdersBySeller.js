import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { requestGetWithToken } from '../services/requests';
import SaleCard from '../components/SaleCard';

function OrdersBySeller() {
  const history = useHistory();
  const [sales, setSales] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { token } = JSON.parse(localStorage.getItem('user'));
        const salesList = await requestGetWithToken('/sales/seller', token);
        setSales(salesList);
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
      <Header />
      {console.log(sales)}
      { sales.length && (
        sales.map((sale) => (
          <SaleCard
            key={ sale.id }
            props={ sale }
          />
        ))
      )}
    </div>
  );
}

export default OrdersBySeller;
