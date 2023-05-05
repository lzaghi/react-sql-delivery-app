import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestLogin } from '../services/requests';

function Login() {
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

  const saveLocalStorage = ({ name, email, role }, token) => {
    localStorage.setItem('user', JSON.stringify({
      name, email, role, token,
    }));
  };

  const login = async () => {
    try {
      const { user, token } = await requestLogin(
        '/login',
        { email: newUser.email, password: newUser.password },
      );

      saveLocalStorage(user, token);

      if (user.role === 'customer') history.push('/customer/products');
      if (user.role === 'seller') history.push('/seller/orders');
      if (user.role === 'administrator') history.push('/admin/manage');
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    const SIX = 6;

    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

    const emailCheck = emailRegex.test(newUser.email);
    const passCheck = newUser.password.length >= SIX;

    if (emailCheck && passCheck) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [newUser.email, newUser.password]);

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
