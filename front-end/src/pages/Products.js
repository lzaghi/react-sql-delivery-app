import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { requestGetWithToken } from '../services/requests';
// import '../style/Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const history = useHistory();

  const cart = useSelector((state) => state.cart.productsValues);
  const totalCart = Object.values(cart)
    .reduce((acc, curr) => acc + (curr.qtty * curr.price), 0);

  const handleRedirect = useCallback(() => {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.role === 'seller') history.push('/seller/orders');
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
        const productsList = await requestGetWithToken('/products', token);
        if (isMounted) setProducts(productsList);
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
  }, [history, handleRedirect]);

  if (error) {
    return <h2>{error.response?.statusText || 'Algo deu errado!'}</h2>;
  }

  return (
    <div>
      <Header />
      <div className="products-page">
        { !products?.length
          ? <p>Carregando...</p>
          : (
            <div className="all-products">
              {
                products.map((product) => (
                  <ProductCard
                    key={ product.id }
                    props={ product }
                  />
                ))
              }
            </div>
          )}
        <div className="cart">
          <p
            data-testid="customer_products__checkout-bottom-value"
          >
            {`Total: R$ ${Number(totalCart).toFixed(2).replace('.', ',')}`}
          </p>
          <button
            data-testid="customer_products__button-cart"
            type="button"
            onClick={ () => history.push('/customer/checkout') }
            disabled={ totalCart === 0 }
          >
            Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;
