import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { requestPost } from '../services/requests';
import { userLogin } from '../redux/actions';
import logo from '../images/logo-red.png';
import '../style/Login.css';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
  });
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');

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

  const login = useCallback(async () => {
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
      setError(e);
    }
  }, [dispatch, history, newUser]);

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === 'Enter' && !disabled) {
        login();
      }
    },
    [disabled, login],
  );

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

    document.addEventListener('keypress', handleKeyPress);

    return () => {};
  }, [newUser.email, newUser.password, handleKeyPress, handleRedirect]);

  return (
    <div className="login">
      <div>
        <img src={ logo } alt="logo do app" />
      </div>
      <form>

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
          data-testid="common_login__button-login"
          type="button"
          disabled={ disabled }
          onClick={ () => login() }
          id="login"
        >
          Login
        </button>
        <button
          data-testid="common_login__button-register"
          type="button"
          className="register-button"
          onClick={ () => history.push('/register') }
        >
          Ainda não tenho uma conta
        </button>
      </form>
      { error !== '' && (
        <p
          data-testid="common_login__element-invalid-email"
        >
          {error.response?.data?.message || 'Algo deu errado!'}
        </p>)}
    </div>
  );
}

export default Login;
