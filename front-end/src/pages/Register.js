import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { requestPost } from '../services/requests';
import { userLogin } from '../redux/actions';
import logo from '../images/logo-red.png';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../css/Login.module.css';
import Loading from '../components/Loading';

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [newUser, setNewUser] = useState({
    name: '',
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

  const saveLocalStorage = ({ name, email, role }, token) => {
    localStorage.setItem('user', JSON.stringify({
      name, email, role, token,
    }));
  };

  const register = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { user, token } = await requestPost(
        '/register',
        { name: newUser.name, email: newUser.email, password: newUser.password },
      );

      saveLocalStorage(user, token);
      dispatch(userLogin(user, token));

      history.push('/customer/products');
    } catch (e) {
      setLoading(false);
      toast.error(e.response?.data?.message || 'Internal error');
    }
  };

  useEffect(() => {
    const TWELVE = 12;
    const SIX = 6;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

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
    <>
      <div className={ styles.container }>
        <div>
          <img src={ logo } alt="logo do app" />
        </div>
        <form onSubmit={ register }>
          <label htmlFor="username">
            Nome completo
          </label>
          <input
            id="username"
            data-testid="common_register__input-name"
            type="text"
            name="name"
            value={ newUser.name }
            onChange={ (e) => handleChange(e) }
          />
          <label htmlFor="email">
            Email
          </label>
          <input
            id="email"
            data-testid="common_register__input-email"
            type="email"
            name="email"
            value={ newUser.email }
            onChange={ (e) => handleChange(e) }
          />
          <label htmlFor="password">
            Senha
          </label>
          <input
            id="password"
            data-testid="common_register__input-password"
            type="password"
            name="password"
            value={ newUser.password }
            onChange={ (e) => handleChange(e) }
          />
          <button
            className={ styles.registerButton }
            data-testid="common_register__button-register"
            type="submit"
            disabled={ disabled }
          >
            Cadastrar
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

export default Register;
