import { USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  role: '',
  token: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      name: action.name,
      email: action.email,
      role: action.role,
      token: action.token,
    };
  default: return state;
  }
};

export default user;
