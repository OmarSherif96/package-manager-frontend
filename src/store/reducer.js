import { combineReducers } from 'redux';
import packagesReducer from './reducers/packagesReducer';
import cartReducer from './reducers/cartRedcuer';

export default combineReducers({
  packagesReducer,
  cartReducer,
});
