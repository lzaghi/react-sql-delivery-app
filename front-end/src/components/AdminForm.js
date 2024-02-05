import React, { useContext, useEffect, useState } from 'react';
import { requestGetWithToken, requestPostWithToken } from '../services/requests';
import UsersContext from '../context/UsersContext';
import styles from '../css/Admin.module.css';

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
    const EIGHT = 8;
    const SIX = 6;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const nameCheck = newUser.name.length >= EIGHT;
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
    <form className={ styles.adminForm }>
      <div className="form-left">
        <label className={ styles.nameLabel } htmlFor="name">
          Nome completo:
          <input
            data-testid="admin_manage__input-name"
            type="name"
            name="name"
            value={ newUser.name }
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <label htmlFor="role">
          Tipo:
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
      </div>
      <div className="form-right">
        <label htmlFor="email">
          Email:
          <input
            data-testid="admin_manage__input-email"
            type="email"
            name="email"
            value={ newUser.email }
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            data-testid="admin_manage__input-password"
            type="password"
            name="password"
            value={ newUser.password }
            onChange={ (e) => handleChange(e) }
          />
        </label>
      </div>
      <button
        data-testid="admin_manage__button-register"
        type="button"
        disabled={ disabled }
        onClick={ () => register() }
      >
        Cadastrar
      </button>
      { error && (
        <p
          data-testid="admin_manage__element-invalid-register"
        >
          {error.response?.data?.message || 'Algo deu errado!'}
        </p>)}
    </form>
  );
}

export default AdminForm;
