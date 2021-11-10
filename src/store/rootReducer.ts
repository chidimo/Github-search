import { combineReducers } from 'redux';

import loginSlice from './login';

export const rootReducer = combineReducers({
  redux__login_slice: loginSlice,
});
