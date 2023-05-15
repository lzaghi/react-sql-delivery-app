import React from 'react';
import { act, screen, waitFor } from "@testing-library/react";
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from '@testing-library/user-event';

describe('Testing register page', () => {
  it('checks inputs and button existence', () => {
    const { history: { location } } = renderWithRouterAndRedux(<App />, {}, '/register');
    expect(location.pathname).toBe('/register');

    const name = screen.getByTestId('common_register__input-name')
    const email = screen.getByTestId('common_register__input-email')
    const password = screen.getByTestId('common_register__input-password')
    const registerButton = screen.getByTestId('common_register__button-register')
    expect(name).toBeDefined();
    expect(email).toBeDefined();
    expect(password).toBeDefined();
    expect(registerButton).toBeDefined();
  })

  it('redirects to "/customer/products" when register is done', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/register');

    const name = screen.getByTestId('common_register__input-name')
    const email = screen.getByTestId('common_register__input-email')
    const password = screen.getByTestId('common_register__input-password')
    const registerButton = screen.getByTestId('common_register__button-register')
    expect(registerButton).toBeDisabled();

    userEvent.type(name, 'Teste Testando');
    userEvent.type(email, 'zebirita@email.com');
    userEvent.type(password, '123456');
    userEvent.type(password, '{enter}');

    await waitFor(() => {
      expect(screen.getByText('Email already registered!')).toBeInTheDocument();
    });

    userEvent.clear(email);
    userEvent.type(email, 'email@email.com');
    expect(registerButton).not.toBeDisabled();
    userEvent.click(registerButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/customer/products');
    });
  })
})