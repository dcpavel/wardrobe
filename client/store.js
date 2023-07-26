import { configureStore } from '@reduxjs/toolkit';

// we are adding composeWithDevTools here to get easy access to the Redux dev tools
const store = configureStore({
  reducer: {
    wardrobe: wardrobeReducer,
    clothing: clothingReducer,
    user: userReducer,
    clothingType: clothingTypeReducer
  }
});

export default store;