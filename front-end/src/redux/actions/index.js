export const USER_LOGIN = 'USER_LOGIN';
export const ALL_PRODUCTS = 'ALL_PRODUCTS';

export function userLogin({ name, email, role }, token) {
  return {
    type: USER_LOGIN,
    name,
    email,
    role,
    token,
  };
}

export function allProducts(products) {
  return {
    type: ALL_PRODUCTS,
    products,
  };
}
