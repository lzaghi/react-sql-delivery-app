import { QUANTITY_ZERO, SET_PRODUCTS_VALUES } from '../actions';

const INITIAL_STATE = {
  productsValues: {},
};

const cart = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PRODUCTS_VALUES:
    return {
      ...state,
      productsValues: {
        ...state.productsValues,
        [action.id]: {
          id: action.id,
          name: action.name,
          qtty: action.qtty,
          price: action.price,
        },
      },
    };
  case QUANTITY_ZERO:
    return {
      ...state,
      productsValues: {
        ...state.productsValues,
        [action.id]: {
          ...state.productsValues[action.id],
          qtty: 0,
        },
      },
    };
  default: return state;
  }
};

export default cart;
