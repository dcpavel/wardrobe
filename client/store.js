import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './reducers/usersReducer';
import wardrobesReducer from './reducers/wardrobesReducer';

// we are adding composeWithDevTools here to get easy access to the Redux dev tools
const store = configureStore({
  reducer: {
    wardrobes: wardrobesReducer,
    // clothing: clothingReducer,
    users: usersSlice,
    // clothingType: clothingTypeReducer
  }
});

export default store;