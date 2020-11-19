import * as actions from '../actions/packagesActions';
const initialState = {
  selectedPackages: [],
};

const packagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_CART:
      return {
        ...state,
        selectedPackages: action.payload,
      };
    default:
      return state;
  }
};

export default packagesReducer;
