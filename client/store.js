import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './reducers/usersReducer';

// we are adding composeWithDevTools here to get easy access to the Redux dev tools
const store = configureStore({
  reducer: {
    // wardrobe: wardrobeReducer,
    // clothing: clothingReducer,
    users: usersSlice.reducer,
    // clothingType: clothingTypeReducer
  }
});

export default store;