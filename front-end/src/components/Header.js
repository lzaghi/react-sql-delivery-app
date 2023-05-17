import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { resetState } from '../redux/actions';
import '../style/Header.css';

function Header() {
  const userName = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  const history = useHistory();
  const { location: { pathname } } = history;

  let navBarText = '';
  let redirectUrl = '';

  if (pathname.includes('/customer')) {
    navBarText = 'Meus pedidos';
    redirectUrl = '/customer/orders';
  } else if (pathname.includes('/seller')) {
    navBarText = 'Pedidos';
    redirectUrl = '/seller/orders';
  } else if (pathname.includes('/admin')) {
    navBarText = 'Gerenciar usuários';
    redirectUrl = '/admin/manage';
  }

  return (
    <div className="header">
      <div className="big-part">
        { pathname.includes('customer') && (
          <Link
            data-testid="customer_products__element-navbar-link-products"
            to="/customer/products"
            id="produtos"
            className={ pathname.includes('products') ? 'active' : '' }
          >
            Produtos
          </Link>
        )}
        <Link
          data-testid="customer_products__element-navbar-link-orders"
          to={ redirectUrl }
          id="variavel"
          className={ pathname.includes('orders') || pathname.includes('manage')
            ? 'active' : '' }
        >
          { navBarText }
        </Link>
      </div>
      <div className="small-part">
        <h3
          data-testid="customer_products__element-navbar-user-full-name"
          id="logged-user"
        >
          {userName}
        </h3>
        <a
          data-testid="customer_products__element-navbar-link-logout"
          href="/login"
          id="logout"
          onClick={ () => {
            localStorage.removeItem('user');
            dispatch(resetState());
            history.push('/login');
          } }
        >
          Logout
        </a>
      </div>
    </div>
  );
}

export default Header;
