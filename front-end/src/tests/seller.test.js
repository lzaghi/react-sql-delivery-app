import React from 'react';
import { screen, waitFor } from "@testing-library/react";
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from '@testing-library/user-event';
import * as api from '../services/requests'

describe('Testing Seller flow', () => {
  const salesList = [
    {
      "id": 1,
      "userId": 3,
      "sellerId": 2,
      "totalPrice": "22.50",
      "deliveryAddress": "Rua Tal",
      "deliveryNumber": "123",
      "status": "Pendente",
      "saleDate": "2023-05-15T22:48:50.000Z"
    },
    {
      "id": 2,
      "userId": 3,
      "sellerId": 2,
      "totalPrice": "22.50",
      "deliveryAddress": "Rua Tal",
      "deliveryNumber": "123",
      "status": "Pendente",
      "saleDate": "2023-05-15T22:49:17.000Z"
    },
    {
      "id": 3,
      "userId": 3,
      "sellerId": 2,
      "totalPrice": "22.50",
      "deliveryAddress": "Rua Tal",
      "deliveryNumber": "123",
      "status": "Pendente",
      "saleDate": "2023-05-15T22:50:16.000Z"
    }
  ]
  const saleDetail = {
  "id": 1,
  "userId": 3,
  "sellerId": 2,
  "totalPrice": "22.50",
  "deliveryAddress": "Rua Tal",
  "deliveryNumber": "123",
  "status": "Pendente",
  "saleDate": "2023-05-15T22:48:50.000Z",
  "seller": {
    "name": "Fulana Pereira",
    "email": "fulana@deliveryapp.com"
  },
  "products": [
    {
      "name": "Heineken 600ml",
      "price": "7.50",
      "SaleProduct": {
        "saleId": 1,
        "productId": 2,
        "quantity": 3
      }
    }
  ]
  }

  it('navigates to /seller/orders and clicks on first order', async () => {
    localStorage.setItem('user', JSON.stringify({
      role: 'seller',
      token: 'validToken'
    }))
    jest.spyOn(api, 'requestGetWithToken').mockImplementation(() => salesList)

    const { history } = renderWithRouterAndRedux(<App />, {}, '/seller/orders');
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/seller/orders');
    });

    jest.clearAllMocks();
    jest.spyOn(api, 'requestGetWithToken').mockImplementation(() => saleDetail)

    const firstSale = screen.getByTestId('sale-0')
    userEvent.click(firstSale)

    await waitFor(() => {
      const detailsDate = screen.getByTestId('seller_order_details__element-order-details-label-order-date')
      expect(detailsDate).toBeDefined();
    });

    const preparingStatusButton = screen.getByTestId('seller_order_details__button-preparing-check')
    userEvent.click(preparingStatusButton)

    const dispatchStatusButton = screen.getByTestId('seller_order_details__button-dispatch-check')
    userEvent.click(dispatchStatusButton)

    jest.clearAllMocks();
  })
})
