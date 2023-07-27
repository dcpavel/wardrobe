import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { redirect } from 'react-router';

const initialState = {
  name: '',
  userId: 0
};

const wardrobesSlice = createSlice({
  name: 'wardrobes',
  initialState,
  reducers: {
    setVal: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    create: (state, action) => {
      console.log(state.name);
      if (!state.name) {
        return;
      }

      const newWardrobe = {
        name: state.name
      };

      fetch(`http://localhost:8080/api/wardrobes/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(newWardrobe)
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

export const { setVal, create } = wardrobesSlice.actions;
export default wardrobesSlice.reducer;