import { ADD_PRODUCTS, SET_TOTAL, SUB_PRODUCTS } from '../actions';

const INITIAL_STATE = {
  total: Number('0'),
};

const cart = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_PRODUCTS:
    return {
      ...state,
      total: Number((state.total + Number(action.price)).toFixed(2)),
      // total: 0,
    };
  case SUB_PRODUCTS:
    return {
      ...state,
      total: Number((state.total - Number(action.price)).toFixed(2)),
      // total: 0,
    };
  case SET_TOTAL:
    return {
      ...state,
      total: action.price,
      // total: 0,
    };
  default: return state;
  }
};

export default cart;
