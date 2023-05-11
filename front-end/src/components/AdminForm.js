import React, { useContext, useEffect, useState } from 'react';
import { requestGetWithToken, requestPostWithToken } from '../services/requests';
import UsersContext from '../context/UsersContext';

function AdminForm() {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');

  const { setUsersList } = useContext(UsersContext);

  function handleChange({ target }) {
    setNewUser({
      ...newUser,
      [target.name]: target.value,
    });
  }

  const register = async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'));
      await requestPostWithToken(
        '/register/admin',
        {
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          role: newUser.role,
        },
        token,
      );
      setNewUser({
        name: '',
        email: '',
        password: '',
        role: '',
      });
      setError('');

      const users = await requestGetWithToken('/users', token);
      setUsersList(users);
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
    const roleCheck = newUser.role !== '';

    if (nameCheck && emailCheck && passCheck && roleCheck) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [newUser.name, newUser.email, newUser.password, newUser.role]);

  return (
    <div>
      <form>
        <label htmlFor="name">
          Nome Completo
          <input
            data-testid="admin_manage__input-name"
            type="name"
            name="name"
            value={ newUser.name }
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            data-testid="admin_manage__input-email"
            type="email"
            name="email"
            value={ newUser.email }
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            data-testid="admin_manage__input-password"
            type="password"
            name="password"
            value={ newUser.password }
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <label htmlFor="role">
          Tipo
          <select
            data-testid="admin_manage__select-role"
            name="role"
            id="role"
            value={ newUser.role }
            onChange={ (e) => handleChange(e) }
          >
            <option value="" disabled hidden>Selecionar</option>
            <option value="customer">Cliente</option>
            <option value="seller">Vendedor</option>
          </select>
        </label>
        <button
          data-testid="admin_manage__button-register"
          type="button"
          disabled={ disabled }
          onClick={ () => register() }
        >
          Cadastrar
        </button>
      </form>
      { error && (
        <p
          data-testid="admin_manage__element-invalid-register"
        >
          {error.response.data.message}
        </p>)}
    </div>
  );
}

export default AdminForm;
