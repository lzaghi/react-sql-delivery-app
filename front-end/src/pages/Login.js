import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { requestPost } from '../services/requests';
import { userLogin } from '../redux/actions';

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

  const handleRedirect = () => {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.role === 'customer') history.push('/customer/products');
      if (user.role === 'seller') history.push('/seller/orders');
      if (user.role === 'administrator') history.push('/admin/manage');
    }
  };

  useEffect(() => {
    handleRedirect();

    const SIX = 6;

    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

    const emailCheck = emailRegex.test(newUser.email);
    const passCheck = newUser.password.length >= SIX;

    if (emailCheck && passCheck) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }

    document.addEventListener('keypress', handleKeyPress);
  }, [newUser.email, newUser.password, handleKeyPress]);

  return (
    <div>
      <form>
        <label htmlFor="email">
          Email
          <input
            data-testid="common_login__input-email"
            type="email"
            name="email"
            value={ newUser.email }
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            data-testid="common_login__input-password"
            type="password"
            name="password"
            value={ newUser.password }
            onChange={ (e) => handleChange(e) }
          />
        </label>
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
          onClick={ () => history.push('/register') }
        >
          Cadastrar
        </button>
      </form>
      { error !== '' && (
        <p
          data-testid="common_login__element-invalid-email"
        >
          {error.response.data.message}
        </p>)}
    </div>
  );
}

export default Login;
