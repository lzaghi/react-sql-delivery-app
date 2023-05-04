import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestRegister } from '../services/login.request';

function Register() {
  const history = useHistory();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');

  function handleChange({ target }) {
    setUser({
      ...user,
      [target.name]: target.value,
    });
  }

  const register = async () => {
    try {
      const { token, role } = await requestRegister(
        '/register',
        { name: user.name, email: user.email, password: user.password },
      );

      localStorage.setItem('token', token);

      if (role === 'customer') history.push('/customer/products');
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    const TWELVE = 12;
    const SIX = 6;

    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

    const nameCheck = user.name.length >= TWELVE;
    const emailCheck = emailRegex.test(user.email);
    const passCheck = user.password.length >= SIX;

    if (nameCheck && emailCheck && passCheck) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user.name, user.email, user.password]);

  return (
    <div>
      <form>
        <label htmlFor="name">
          Nome Completo
          <input
            data-testid="common_register__input-name"
            type="name"
            name="name"
            value={ user.name }
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            data-testid="common_register__input-email"
            type="email"
            name="email"
            value={ user.email }
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            data-testid="common_register__input-password"
            type="password"
            name="password"
            value={ user.password }
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <button
          data-testid="common_register__button-register"
          type="button"
          disabled={ disabled }
          onClick={ () => register() }
        >
          Cadastrar
        </button>
      </form>
      { error && (
        <p
          data-testid="common_register__element-invalid_register"
        >
          {error.response.data.message}
        </p>)}
    </div>
  );
}

export default Register;
