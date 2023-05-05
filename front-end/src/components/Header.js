import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {
  const userName = useSelector((state) => state.user.name);
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
      <Link
        data-testid="customer_products__element-navbar-link-logout"
        to="/login"
      >
        Logout
      </Link>
    </div>
  );
}

export default Header;
