import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import CheckoutReducer from './CheckoutReducer';

export default combineReducers({
  checkout: CheckoutReducer,
  form: formReducer
});
