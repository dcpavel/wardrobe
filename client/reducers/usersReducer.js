import * as types from '../constants/actions';
import { createSlice } from '@reduxjs/toolkit';

const checkRequiredFields = (state) => {
  const reqFields = Object.keys(initialState);
  delete reqFields.lastname;

  const errors = {};
  for (const field of reqFields) {
    if (!state[field]) {
      errors[field] = `You must include a value.`;
    } else if (field === 'email') {
      if (!(state[field]).test(/[\w\d]+@\w+\.\w{2,3}/i)) {
        errors[field] = 'Email must be in valid format.';
      }
    } else if (field === 'password') {
      // TODO: Password enforcement?
    }    
  }

  return errors;
}

const initialState = {
  firstname: '',
  lastname: '',
  username: '',
  password: '',
  email: '',
  errors: {}
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const errors = checkRequiredFields(state);
      if (Object.keys(errors).length !== 0) {
        state.errors = errors;
      } else {
      }
    },
    setField: (state, action) => {
      const { field, value } = action.payload;
      console.log(action.payload);
      state[field] = value;
    },
  }
});

export const { addUser, setField } = usersSlice.actions;
export default usersSlice.reducer;