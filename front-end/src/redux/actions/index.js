export const USER_LOGIN = 'USER_LOGIN';

export function userLogin({ name, email, role }, token) {
  return {
    type: USER_LOGIN,
    name,
    email,
    role,
    token,
  };
}
