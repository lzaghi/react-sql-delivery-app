import React from 'react';
import { screen, waitFor } from "@testing-library/react";
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from '@testing-library/user-event';
import * as api from '../services/requests'

describe('Testing Customer flow', () => {
  beforeAll(() => {
    jest.restoreAllMocks();
  })

  afterEach(() => {
    jest.clearAllMocks();
  })
  
  it('redirects from /customer/products to /login if not logged in', async () => {
    localStorage.removeItem('user');
    const { history } = renderWithRouterAndRedux(<App />, {}, '/customer/products');

    await waitFor(() => {
      expect(history.location.pathname).toBe('/login');
    });
  })

  it('redirects from /customer/products to /login if token is invalid', async () => {
    jest.spyOn(api, 'requestGetWithToken').mockRejectedValue({
      response: { status: 401 },
    })
    
    localStorage.setItem('user', JSON.stringify({ role: 'customer', token: 'invalid'}));
    const { history } = renderWithRouterAndRedux(<App />, {}, '/customer/products');

    await waitFor(() => {
      expect(history.location.pathname).toBe('/login');
    });
    localStorage.removeItem('user')
    jest.clearAllMocks();
  })

  // it('returns API error in fail case', async () => {
  //   const errorMessage = 'Something went wrong!';
  //   const errorResponse = { response: { statusText: errorMessage } };
  //   jest.spyOn(api, 'requestGetWithToken').mockImplementation(() => {
  //     throw errorResponse;
  //   })
    
  //   const { history } = renderWithRouterAndRedux(<App />);

  //   const email = screen.getByTestId('common_login__input-email')
  //   const password = screen.getByTestId('common_login__input-password')
  //   const loginButton = screen.getByTestId('common_login__button-login')

  //   userEvent.clear(email);
  //   userEvent.type(email, 'zebirita@email.com');
  //   userEvent.type(password, '$#zebirita#$');
  //   userEvent.click(loginButton)

  //   await waitFor(() => {
  //     expect(history.location.pathname).toBe('/customer/products');
  //   });

  //   await waitFor(() => {
  //     expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
  //   });

  //   jest.clearAllMocks();
  // })

  const productsListMock = [
    {
      id: 1,
      name: 'Skol Lata 250ml',
      price: '2.20',
      url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
    },
    {
      id: 2,
      name: 'Heineken 600ml',
      price: '7.50',
      url_image: 'http://localhost:3001/images/heineken_600ml.jpg',
    },
    {
      id: 3,
      name: 'Antarctica Pilsen 300ml',
      price: '2.49',
      url_image: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
    },
    {
      id: 4,
      name: 'Brahma 600ml',
      price: '7.50',
      url_image: 'http://localhost:3001/images/brahma_600ml.jpg',
    },
  ]

  it('adds items to cart, redirect to checkout, finish order and see its details', async () => {
    const spy = jest.spyOn(api, 'requestGetWithToken').mockResolvedValue(productsListMock)
    // localStorage.removeItem('user')
    localStorage.setItem('user', JSON.stringify({ 
    role: 'customer',
    token: 'validToken'}))
    const { history } = renderWithRouterAndRedux(<App />, {}, '/customer/products');
    
    // const email = screen.getByTestId('common_login__input-email')
    // const password = screen.getByTestId('common_login__input-password')
    // const loginButton = screen.getByTestId('common_login__button-login')

    // jest.spyOn(api, 'requestPost').mockReturnValueOnce({
    //   user: {name: 'Cliente Zé Birita',
    //   email: 'zebirita@email.com',
    //   password: '$#zebirita#$',
    //   role: 'customer' },
    //   token: 'validToken'
    // })

    // userEvent.clear(email);
    // userEvent.type(email, 'zebirita@email.com');
    // userEvent.type(password, '$#zebirita#$');
    // userEvent.click(loginButton)

    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/customer/products');
    });
    // await waitFor(() => {
    //   expect(screen.getByText('Carregando...')).toBeDefined();
    // });

    // await waitForElementToBeRemoved(() => {
    //   screen.getByText('Carregando...');
    // });
    expect(spy).toHaveBeenCalledTimes(1);
    
    await waitFor(() => {
      const productTitle = screen.getByTestId('customer_products__element-card-title-1')
      expect(productTitle).toBeDefined();
    });

    jest.clearAllMocks();

    const addToCart1 = screen.getByTestId('customer_products__button-card-add-item-1')
    const rmFromCart1 = screen.getByTestId('customer_products__button-card-rm-item-1')
    userEvent.click(addToCart1);
    userEvent.click(rmFromCart1);

    const addToCart2 = screen.getByTestId('customer_products__button-card-add-item-2')
    userEvent.click(addToCart2);
    userEvent.click(addToCart2);
    userEvent.click(addToCart2);

    const inputProduct3 = screen.getByTestId('customer_products__input-card-quantity-3')
    userEvent.clear(inputProduct3);
    userEvent.type(inputProduct3, '-1');
    userEvent.clear(inputProduct3);
    userEvent.type(inputProduct3, '3');

    const cart = screen.getByTestId('customer_products__button-cart')
    userEvent.click(cart);

    jest.spyOn(api, 'requestGetWithToken').mockImplementation(() => ([
      {
        "id": 2,
        "name": "Fulana Pereira",
        "email": "fulana@deliveryapp.com",
        "role": "seller"
      },
    ]))

    jest.spyOn(api, 'requestPostWithToken').mockImplementation(() => ({
      "id": 10,
      "userId": 1,
      "sellerId": 2,
      "totalPrice": 10,
      "deliveryAddress": "lala",
      "deliveryNumber": "userInfo.number",
      "status": "Pendente",
      "saleDate": "2023-05-22T23:13:05.892Z"
    }))
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/customer/checkout');
    });

    const chekcoutCart = screen.getByTestId('customer_checkout__element-order-total-price')
    expect(chekcoutCart).toHaveTextContent('29,97')

    const removeButton = screen.getByTestId('customer_checkout__element-order-table-remove-1').firstChild
    userEvent.click(removeButton)

    expect(chekcoutCart).toHaveTextContent('22,50')
    
    const sellerSelect = screen.getByTestId('customer_checkout__select-seller');
    // await waitFor(() => {
    //   expect(sellerSelect.options.length).toBeGreaterThan(1);
    // });
    const addressInput = screen.getByTestId('customer_checkout__input-address')
    const addressNumberInput = screen.getByTestId('customer_checkout__input-address-number')
    const finishButton = screen.getByTestId('customer_checkout__button-submit-order')
    
    userEvent.selectOptions(sellerSelect, '2')
    userEvent.type(addressInput, 'Rua Tal')
    userEvent.type(addressNumberInput, '123')
    expect(finishButton).not.toBeDisabled();
    userEvent.click(finishButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/customer/orders/10');
    });
  })

  it('redirects from /customer/checkout to /login if not logged in', async () => {
    localStorage.removeItem('user');
    const { history } = renderWithRouterAndRedux(<App />, {}, '/customer/checkout');

    await waitFor(() => {
      expect(history.location.pathname).toBe('/login');
    });
  })

  it('redirects from /customer/checkout to /login if token is invalid', async () => {
    jest.spyOn(api, 'requestGetWithToken').mockRejectedValue({
      response: { status: 401 },
    })
    
    localStorage.setItem('user', JSON.stringify({ role: 'customer', token: 'invalid'}));
    const { history } = renderWithRouterAndRedux(<App />, {}, '/customer/checkout');

    await waitFor(() => {
      expect(history.location.pathname).toBe('/login');
    });

    localStorage.removeItem('user')
  })

  it('redirects from /customer/orders to /login if not logged in', async () => {
    localStorage.removeItem('user');
    const { history } = renderWithRouterAndRedux(<App />, {}, '/customer/orders');

    await waitFor(() => {
      expect(history.location.pathname).toBe('/login');
    });
  })

  it('redirects from /customer/orders to /login if token is invalid', async () => {
    jest.spyOn(api, 'requestGetWithToken').mockRejectedValue({
      response: { status: 401 },
    })
    
    localStorage.setItem('user', JSON.stringify({ role: 'customer', token: 'invalid'}));
    const { history } = renderWithRouterAndRedux(<App />, {}, '/customer/orders');

    await waitFor(() => {
      expect(history.location.pathname).toBe('/login');
    });

    localStorage.removeItem('user')
  })

  it('redirects from /customer/orders/1 to /login if token is invalid', async () => {
    jest.spyOn(api, 'requestGetWithToken').mockRejectedValue({
      response: { status: 401 },
    })
    
    localStorage.setItem('user', JSON.stringify({ role: 'customer', token: 'invalid'}));
    const { history } = renderWithRouterAndRedux(<App />, {}, '/customer/orders/1');

    await waitFor(() => {
      expect(history.location.pathname).toBe('/login');
    });

    localStorage.removeItem('user')
  })

  it('navigates to /customer/orders with no orders made and logout', async () => {
    localStorage.setItem('user', JSON.stringify({
      role: 'customer',
      token: 'validToken'
    }))

    jest.spyOn(api, 'requestGetWithToken').mockImplementation(() => [])

    const { history } = renderWithRouterAndRedux(<App />, {}, '/customer/orders');
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/customer/orders');
    });

    const noOrdersMessage = screen.getByText('Ainda não há pedidos!')
    expect(noOrdersMessage).toBeDefined();

    const logoutButton = screen.getByTestId('customer_products__element-navbar-link-logout');
    userEvent.click(logoutButton);
  })

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
  "status": "Em Trânsito",
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

  it('navigates to /customer/orders and clicks on first order', async () => {
    localStorage.setItem('user', JSON.stringify({
      role: 'customer',
      token: 'validToken'
    }))
    jest.spyOn(api, 'requestGetWithToken').mockImplementation(() => salesList)

    const { history } = renderWithRouterAndRedux(<App />, {}, '/customer/orders');
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/customer/orders');
    });

    jest.clearAllMocks();
    jest.spyOn(api, 'requestGetWithToken').mockImplementation(() => saleDetail)

    const firstSale = screen.getByTestId('sale-0')
    userEvent.click(firstSale)

    await waitFor(() => {
      const detailsSeller = screen.getByTestId('customer_order_details__element-order-details-label-seller-name')
      expect(detailsSeller).toBeDefined();
    });

    const detailsStatusButton = screen.getByTestId('customer_order_details__button-delivery-check')
    userEvent.click(detailsStatusButton)

    jest.clearAllMocks();
  })

  // it('', () => {
  //   const initialState = {
  //     cart: {
  //       productsValues: {
  //         1: {id:1, name:'Skol Lata 250ml', qtty:0, price:2.20},
  //         2: {id:2, name:'Heineken 600ml', qtty:3, price:7.50},
  //         3: {id:3, name:'Antarctica Pilsen 300ml', qtty:3, price:2.49}
  //       }
  //     }
  //   }

  //   const user = {
  //     email: "zebirita@email.com",
  //     id: 3,
  //     name: "Cliente Zé Birita",
  //     role: "customer",
  //     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJFbWFpbCI6InplYmlyaXRhQGVtYWlsLmNvbSIsImlhdCI6MTY4NDE4MzYwNSwiZXhwIjoxNjg0MzU2NDA1fQ.i3HDHKWAS9x4sL3ZCMUJXfCfCsZNyDgh4dIjEYEEVDU"
  //   }
  //   localStorage.setItem('user', JSON.stringify(user))

  //   const { history } = renderWithRouterAndRedux(<App />, initialState, 'customer/checkout');
    
  //   const cart = screen.getByTestId('customer_checkout__element-order-total-price')
  //   expect(cart).toHaveTextContent('29,97')
  // })
})