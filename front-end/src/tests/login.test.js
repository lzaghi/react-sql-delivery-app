import React from 'react';
import { act, screen, waitFor } from "@testing-library/react";
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from '@testing-library/user-event';

describe('Testing login page', () => {
  it('checks inputs and buttons existence', () => {
    const { history: { location } } = renderWithRouterAndRedux(<App />);
    expect(location.pathname).toBe('/login');

    const email = screen.getByTestId('common_login__input-email')
    const password = screen.getByTestId('common_login__input-password')
    const loginButton = screen.getByTestId('common_login__button-login')
    const registerButton = screen.getByTestId('common_login__button-register')
    expect(email).toBeDefined();
    expect(password).toBeDefined();
    expect(loginButton).toBeDefined();
    expect(registerButton).toBeDefined();
  })

  it('redirects to "/customer/products" when login is done by a customer', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId('common_login__input-email')
    const password = screen.getByTestId('common_login__input-password')
    const loginButton = screen.getByTestId('common_login__button-login')
    expect(loginButton).toBeDisabled();

    userEvent.type(email, 'zebirita@email.c');
    userEvent.type(password, '$#zebirita#$');
    userEvent.type(password, '{enter}');
    await waitFor(() => {
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });

    userEvent.clear(email);
    userEvent.type(email, 'zebirita@email.com');
    expect(loginButton).not.toBeDisabled();
    userEvent.click(loginButton)
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/customer/products');
    });

    act(() => {
      history.push('/login');
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/customer/products');
    });
  })

  it('redirects to "/seller/orders" when login is done by a seller', async () => {
    localStorage.removeItem('user')
    const { history } = renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId('common_login__input-email')
    const password = screen.getByTestId('common_login__input-password')
    const loginButton = screen.getByTestId('common_login__button-login')

    userEvent.clear(email);
    userEvent.type(email, 'fulana@deliveryapp.com');
    userEvent.type(password, 'fulana@123');
    userEvent.click(loginButton)
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/seller/orders');
    });

    act(() => {
      history.push('/login');
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/seller/orders');
    });
  })

  it('redirects to "/admin/manage" when login is done by an administrator', async () => {
    localStorage.removeItem('user')
    const { history } = renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId('common_login__input-email')
    const password = screen.getByTestId('common_login__input-password')
    const loginButton = screen.getByTestId('common_login__button-login')

    userEvent.clear(email);
    userEvent.type(email, 'adm@deliveryapp.com');
    userEvent.type(password, '--adm2@21!!--');
    userEvent.click(loginButton)
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/admin/manage');
    });

    act(() => {
      history.push('/login');
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/admin/manage');
    });
  })

  it('redirects to "/register" when button is clicked', async () => {
    localStorage.removeItem('user')
    const { history } = renderWithRouterAndRedux(<App />);
    
    const registerButton = screen.getByTestId('common_login__button-register')
    userEvent.click(registerButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/register');
    });
  })
})