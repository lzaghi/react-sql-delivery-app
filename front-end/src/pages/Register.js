import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { requestPost } from '../services/requests';
import { userLogin } from '../redux/actions';

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [newUser, setNewUser] = useState({
    name: '',
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

  const register = async () => {
    try {
      const { user, token } = await requestPost(
        '/register',
        { name: newUser.name, email: newUser.email, password: newUser.password },
      );

      saveLocalStorage(user, token);
      dispatch(userLogin(user, token));

      if (user.role === 'customer') history.push('/customer/products');
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    const TWELVE = 12;
    const SIX = 6;

    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

    const nameCheck = newUser.name.length >= TWELVE;
    const emailCheck = emailRegex.test(newUser.email);
    const passCheck = newUser.password.length >= SIX;

    if (nameCheck && emailCheck && passCheck) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [newUser.name, newUser.email, newUser.password]);

  return (
    <div>
      <form>
        <label htmlFor="name">
          Nome Completo
          <input
            data-testid="common_register__input-name"
            type="name"
            name="name"
            value={ newUser.name }
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            data-testid="common_register__input-email"
            type="email"
            name="email"
            value={ newUser.email }
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            data-testid="common_register__input-password"
            type="password"
            name="password"
            value={ newUser.password }
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
