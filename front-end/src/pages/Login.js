import React, { useEffect, useState } from 'react';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [disabled, setDisabled] = useState(true);
  // const [error, setError] = useState(false);

  function handleChange({ target }) {
    setUser({
      ...user,
      [target.name]: target.value,
    });
  }

  useEffect(() => {
    const SIX = 6;

    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

    const emailCheck = emailRegex.test(user.email);
    const passCheck = user.password.length >= SIX;

    if (emailCheck && passCheck) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user.email, user.password]);

  return (
    <div>
      <form>
        <label htmlFor="email">
          Email
          <input
            data-testid="common_login__input-email"
            type="email"
            name="email"
            value={ user.email }
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            data-testid="common_login__input-password"
            type="password"
            name="password"
            value={ user.password }
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <button
          data-testid="common_login__button-login"
          type="button"
          disabled={ disabled }
        >
          Login
        </button>
        <button
          data-testid="common_login__button-register"
          type="button"
        >
          Cadastrar
        </button>
      </form>
      {/* { error && (
        <p
          data-testid="common_login__element-invalid-email"
        >
          Email inválido!
        </p>)} */}
    </div>
  );
}

export default Login;