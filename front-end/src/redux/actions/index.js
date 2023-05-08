export const USER_LOGIN = 'USER_LOGIN';
export const ADD_PRODUCTS = 'ADD_PRODUCTS';
export const SUB_PRODUCTS = 'SUB_PRODUCTS';
export const SET_TOTAL_INPUT = 'SET_TOTAL_INPUT';

export function userLogin({ name, email, role }, token) {
  return {
    type: USER_LOGIN,
    name,
    email,
    role,
    token,
  };
}

export function addProductToCart(price) {
  return {
    type: ADD_PRODUCTS,
    price,
  };
}

export function subProductToCart(price) {
  return {
    type: SUB_PRODUCTS,
    price,
  };
}

export function setTotalInput(price) {
  return {
    type: SET_TOTAL_INPUT,
    price,
  };
}
