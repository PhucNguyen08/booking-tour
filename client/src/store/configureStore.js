import { configureStore } from '@reduxjs/toolkit';
import tourSliceReducer from './tourSlice';

export const store = configureStore({
    reducer: {
        tour: tourSliceReducer,
    },
});
