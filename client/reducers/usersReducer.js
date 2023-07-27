import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { redirect } from 'react-router';

const checkRequiredFields = (payload) => {
  const reqFields = Object.keys(initialState);
  delete reqFields.lastname;

  const errors = {};
  for (const field of reqFields) {
    if (!payload[field]) {
      errors[field] = `You must include a value.`;
    } else if (field === 'email') {
      if (!(payload[field]).test(/[\w\d]+@\w+\.\w{2,3}/i)) {
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
  errors: null,
  status: 'idle',
  loggedIn: false
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const errors = checkRequiredFields(action.payload);
      if (Object.keys(errors).length !== 0) {
        state.errors = errors;
      } else {
      }
    },
    setVal: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    login: (state, action) => {
      const credentials = {
        username: state.username,
        password: state.password
      }    
      fetch(`http://localhost:8080/api/users/login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
        .then((res) => {
          console.log(res);
          if (res.ok) {
            return true;
          } else {
            return false;
          }
        })
        .catch((err) => {
          return err;
        });
    }
  }
});

export const { addUser, setVal, login } = usersSlice.actions;
export default usersSlice.reducer;