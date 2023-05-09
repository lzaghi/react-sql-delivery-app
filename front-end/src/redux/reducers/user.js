import { RESET_STATE, USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  id: '',
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
      id: action.id,
      name: action.name,
      email: action.email,
      role: action.role,
      token: action.token,
    };
  case RESET_STATE:
    return INITIAL_STATE;
  default: return state;
  }
};

export default user;
