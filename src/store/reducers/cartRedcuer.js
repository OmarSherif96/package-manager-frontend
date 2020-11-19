import * as actions from '../actions/cartActions';

const initialState = {
  cartIsOpen: false,
};

const cartRedcuer = (state = initialState, action) => {
  switch (action.type) {
    case actions.TOGGLE_CART:
      return { ...state, cartIsOpen: !state.cartIsOpen };
    default:
      return state;
  }
};

export default cartRedcuer;
