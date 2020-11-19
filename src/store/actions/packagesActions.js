export const SET_CART = 'SET_CART';

export const setCart = (selectedPackages) => ({
  type: SET_CART,
  payload: selectedPackages,
});
