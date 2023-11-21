import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { requestPost } from '../services/requests';
import { userLogin } from '../redux/actions';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../images/logo-red.png';
// import '../style/Login.css';
import styles from '../css/Login.module.css';
import Loading from '../components/Loading';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  function handleChange({ target }) {
    setNewUser({
      ...newUser,
      [target.name]: target.value,
    });
  }

  const saveLocalStorage = ({ id, name, email, role }, token) => {
    localStorage.setItem('user', JSON.stringify({
      id, name, email, role, token,
    }));
  };

  const login = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { user, token } = await requestPost(
        '/login',
        { email: newUser.email, password: newUser.password },
      );

      saveLocalStorage(user, token);
      dispatch(userLogin(user, token));

      if (user.role === 'customer') history.push('/customer/products');
      if (user.role === 'seller') history.push('/seller/orders');
      if (user.role === 'administrator') history.push('/admin/manage');
    } catch (e) {
      setLoading(false);
      toast.error(e.response?.data?.message || 'Internal error');
    }
  };

  const handleRedirect = useCallback(() => {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.role === 'customer') history.push('/customer/products');
      if (user.role === 'seller') history.push('/seller/orders');
      if (user.role === 'administrator') history.push('/admin/manage');
    }
  }, [history]);

  useEffect(() => {
    handleRedirect();

    const SIX = 6;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const emailCheck = emailRegex.test(newUser.email);
    const passCheck = newUser.password.length >= SIX;

    if (emailCheck && passCheck) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }

    return () => {};
  }, [newUser.email, newUser.password, handleRedirect]);

  return (
    <>
      <div className={ styles.container }>
        <div>
          <img src={ logo } alt="logo do app" />
        </div>
        <form onSubmit={ login }>
          <input
            data-testid="common_login__input-email"
            type="email"
            name="email"
            value={ newUser.email }
            onChange={ (e) => handleChange(e) }
            placeholder="Email"
          />

          <input
            data-testid="common_login__input-password"
            type="password"
            name="password"
            value={ newUser.password }
            onChange={ (e) => handleChange(e) }
            placeholder="Senha"
          />

          <button
            className={ styles.formButton }
            data-testid="common_login__button-login"
            type="submit"
            disabled={ disabled }
            id="login"
          >
            Login
          </button>
          <button
            data-testid="common_login__button-register"
            type="button"
            className={ styles.registerButton }
            onClick={ () => history.push('/register') }
          >
            Ainda não tenho uma conta
          </button>
          {
            loading && <div className={ styles.loginLoading }><Loading /></div>
          }
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
