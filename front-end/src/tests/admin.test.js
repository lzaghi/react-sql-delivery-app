import React from 'react';
import { screen, waitFor } from "@testing-library/react";
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from '@testing-library/user-event';
import * as api from '../services/requests'

describe('Testing Admin flow', () => {
  it('redirects from /admin/manage to /login if not logged in', async () => {
    localStorage.removeItem('user');
    const { history } = renderWithRouterAndRedux(<App />, {}, '/admin/manage');

    await waitFor(() => {
      expect(history.location.pathname).toBe('/login');
    });
  })

  it('redirects from /admin/manage to /login if token is invalid', async () => {
    localStorage.setItem('user', JSON.stringify({ role: 'customer', token: 'invalid'}));
    const { history } = renderWithRouterAndRedux(<App />, {}, '/admin/manage');

    await waitFor(() => {
      expect(history.location.pathname).toBe('/login');
    });
    localStorage.removeItem('user')
  })

  it('registers a new user and deletes one from the list', async () => {
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

    const nameInput = screen.getByTestId('admin_manage__input-name')
    const emailInput = screen.getByTestId('admin_manage__input-email')
    const passwordInput = screen.getByTestId('admin_manage__input-password')
    const roleSelect = screen.getByTestId('admin_manage__select-role')
    const registerButton = screen.getByTestId('admin_manage__button-register')

    jest.spyOn(api, 'requestPostWithToken').mockImplementation(() => ({
      user: {
        id: 10,
        name: 'Teste Testinho',
        email: 'teste@teste.com',
        role: 'customer'
      },
      token: 'validToken'
    }))

    jest.spyOn(api, 'requestGetWithToken').mockImplementation(() => ([
      {
        "id": 2,
        "name": "Fulana Pereira",
        "email": "fulana@deliveryapp.com",
        "role": "seller"
      },
      {
        "id": 3,
        "name": "Cliente Zé Birita",
        "email": "zebirita@email.com",
        "role": "customer"
      }]
    ))

    userEvent.type(nameInput, 'Teste Testinho')
    userEvent.type(emailInput, 'teste@teste.com')
    userEvent.type(passwordInput, '123456')
    userEvent.selectOptions(roleSelect, 'customer')
    userEvent.click(registerButton)

    await waitFor(() => {
      const deleteUserButton = screen.getByTestId('admin_manage__element-user-table-remove-1');
      expect(deleteUserButton).toBeDefined();
      userEvent.click(deleteUserButton)
    });

    jest.clearAllMocks();
  })
})