import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './reducers/usersReducer';
import wardrobesReducer from './reducers/wardrobesReducer';
import clothesReducer from './reducers/clothesReducer';
import clothingTypesReducer from './reducers/clothingTypesReducer';

// we are adding composeWithDevTools here to get easy access to the Redux dev tools
const store = configureStore({
  reducer: {
    wardrobes: wardrobesReducer,
    clothes: clothesReducer,
    users: usersSlice,
    clothingTypes: clothingTypesReducer
  }
});

export default store;