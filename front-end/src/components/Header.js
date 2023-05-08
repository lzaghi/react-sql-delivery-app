import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

function Header() {
  const userName = useSelector((state) => state.user.name);
  const history = useHistory();
  return (
    <div>
      <Link
        data-testid="customer_products__element-navbar-link-products"
        to="/customer/products"
      >
        Produtos
      </Link>
      <Link
        data-testid="customer_products__element-navbar-link-orders"
        to="/customer/orders"
      >
        Meus pedidos
      </Link>
      <h3
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {userName}
      </h3>
      <a
        data-testid="customer_products__element-navbar-link-logout"
        href="/login"
        onClick={ () => {
          localStorage.removeItem('user');
          history.push('/login');
        } }
      >
        Logout
      </a>
    </div>
  );
}

export default Header;
