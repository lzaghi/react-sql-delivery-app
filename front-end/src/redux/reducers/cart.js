import { ADD_PRODUCTS, SUB_PRODUCTS } from '../actions';

const INITIAL_STATE = {
  total: 0,
};

const cart = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_PRODUCTS:
    return {
      ...state,
      total: Number((state.total + Number(action.price)).toFixed(2)),
    };
  case SUB_PRODUCTS:
    return {
      ...state,
      total: Number((state.total - Number(action.price)).toFixed(2)),
    };
  default: return state;
  }
};

export default cart;
