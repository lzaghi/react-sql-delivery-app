import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { resetState } from '../redux/actions';
import logo from '../images/logo-white-cut.png';
import styles from '../css/Header.module.css';

function Header() {
  const userName = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  const history = useHistory();
  const { location: { pathname } } = history;

  let navBarText = '';
  let iconText = '';
  let redirectUrl = '';

  if (pathname.includes('/customer')) {
    navBarText = 'Meus pedidos';
    iconText = 'receipt_long';
    redirectUrl = '/customer/orders';
  } else if (pathname.includes('/seller')) {
    navBarText = 'Pedidos';
    iconText = 'receipt_long';
    redirectUrl = '/seller/orders';
  } else if (pathname.includes('/admin')) {
    navBarText = 'Gerenciar usuários';
    iconText = 'groups';
    redirectUrl = '/admin/manage';
  }

  return (
    <div className={ styles.container }>
      <div className={ styles.header }>
        <img src={ logo } alt="logo do app" className={ styles.headerLogo } />
        <div className={ styles.pages }>
          { pathname.includes('customer') && (
            <Link
              data-testid="customer_products__element-navbar-link-products"
              to="/customer/products"
              id="produtos"
              className={ pathname.includes('products')
                ? `${styles.active} produtos` : 'produtos' }
            >
              <span
                className={ `${styles.icon} material-icons-outlined` }
              >
                sports_bar

              </span>
              <span className={ styles.text }>Produtos</span>
            </Link>
          )}
          <Link
            data-testid="customer_products__element-navbar-link-orders"
            to={ redirectUrl }
            id="variavel"
            className={
              pathname === '/customer/orders'
          || pathname === '/seller/orders'
          || pathname.includes('manage')
                ? `${styles.active} variavel` : 'variavel'
            }
          >
            <span
              className={ `${styles.icon} material-icons-outlined` }
            >
              { iconText }

            </span>
            <span className={ styles.text }>{ navBarText }</span>
          </Link>
        </div>
        <div className="small-part">
          <h3
            data-testid="customer_products__element-navbar-user-full-name"
            id="logged-user"
            className={ styles.loggedUser }
          >
            <span
              className={ `${styles.icon} material-icons-outlined` }
            >
              account_circle

            </span>
            <span className={ styles.text }>{userName}</span>
          </h3>
          <a
            data-testid="customer_products__element-navbar-link-logout"
            href="/login"
            id="logout"
            className="logout"
            onClick={ () => {
              localStorage.removeItem('user');
              dispatch(resetState());
              history.push('/login');
            } }
          >
            <span className={ styles.text }>Logout</span>
            <span
              className={ `${styles.icon} material-icons-outlined` }
            >
              logout

            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
