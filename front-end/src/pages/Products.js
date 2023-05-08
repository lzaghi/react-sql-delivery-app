import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { requestProducts } from '../services/requests';

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const history = useHistory();

  const totalCart = useSelector((state) => state.cart.total);

  useEffect(() => {
    async function fetchData() {
      try {
        const { token } = JSON.parse(localStorage.getItem('user'));
        const productsList = await requestProducts('/products', token);
        setProducts(productsList);
      } catch (e) {
        const UNAUTHORIZED = 401;
        if (e.response.status === UNAUTHORIZED) {
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
      { products.length && (
        products.map((product) => (
          <ProductCard
            key={ product.id }
            props={ product }
          />
        ))
      )}
      <button type="button">{`Ver Carrinho: R$ ${totalCart}`}</button>
    </div>
  );
}

export default Products;
