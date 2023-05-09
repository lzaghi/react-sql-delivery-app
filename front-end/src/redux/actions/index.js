export const USER_LOGIN = 'USER_LOGIN';
export const SET_PRODUCTS_VALUES = 'SET_PRODUCTS_VALUES';
export const QUANTITY_ZERO = 'QUANTITY_ZERO';

export function userLogin({ name, email, role }, token) {
  return {
    type: USER_LOGIN,
    name,
    email,
    role,
    token,
  };
}

export function setProductsValues(id, name, qtty, price) {
  return {
    type: SET_PRODUCTS_VALUES,
    id,
    name,
    qtty,
    price,
  };
}

export function setQttyToZero(id) {
  return {
    type: QUANTITY_ZERO,
    id,
  };
}
