import { SET_PRODUCTS_VALUES } from '../actions';

const INITIAL_STATE = {
  productsValues: {},
};

const cart = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PRODUCTS_VALUES:
    return {
      ...state,
      productsValues: { ...state.productsValues, [action.id]: action.value },
    };
  default: return state;
  }
};

export default cart;