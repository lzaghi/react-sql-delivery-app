import { ADD_PRODUCTS, SET_TOTAL_INPUT, SUB_PRODUCTS } from '../actions';

const INITIAL_STATE = {
  total: 0,
  totalInput: 0,
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
  case SET_TOTAL_INPUT:
    return {
      ...state,
      totalInput: Number((state.total + Number(action.price)).toFixed(2)),
      // total: 0,
      // totalInput: 0,
    };
  default: return state;
  }
};

export default cart;
