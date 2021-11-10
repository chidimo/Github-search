import { createSlice, createSelector } from '@reduxjs/toolkit';

type LoginStateType = {
  access_token: string;
  userLoggedIn: boolean;
};

const initialState: LoginStateType = {
  access_token: '',
  userLoggedIn: false,
};

const loginSlice = createSlice({
  name: 'redux__login_slice',
  initialState,
  reducers: {
    setUserLoggedIn: (state, action) => {
      state.userLoggedIn = true;
      state.access_token = action.payload;
    },
    resetUserLoggedIn: () => initialState,
  },
});

export const { setUserLoggedIn, resetUserLoggedIn } = loginSlice.actions;

const getLogIn = (state: any) => state.redux__login_slice.userLoggedIn;

export const selectLoginState = createSelector(
  getLogIn,
  (userLoggedIn) => userLoggedIn
);

export default loginSlice.reducer;
