import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { redirect } from 'react-router';

const initialState = {
  name: '',
  bodyPosition: ''
};

const clothingTypesSlice = createSlice({
  name: 'clothingTypes',
  initialState,
  reducers: {
    setVal: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    create: (state, action) => {
      // verify and create package

      fetch(`http://localhost:8080/api/clothingTypes/`, {
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

export const { setVal, create } = clothingTypesSlice.actions;
export default clothingTypesSlice.reducer;