import { combineReducers } from 'redux';
import CheckoutReducer from './CheckoutReducer';

export default combineReducers({
  checkout: CheckoutReducer
});
