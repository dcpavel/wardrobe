import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { redirect } from 'react-router';

const initialState = {
  name: '',
  link: '',
  colors: [],
  patterns: [],
  fabrics: [],
  picture: '',
  thumbnail: '',
  wardrobeId: 0,
  typeId: 0
};

const clothesSlice = createSlice({
  name: 'clothes',
  initialState,
  reducers: {
    setVal: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    create: (state, action) => {
      // verify and create package

      fetch(`http://localhost:8080/api/clothes/`, {
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

export const { setVal, create } = clothesSlice.actions;
export default clothesSlice.reducer;