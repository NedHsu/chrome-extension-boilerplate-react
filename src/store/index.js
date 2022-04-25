import { configureStore } from '@reduxjs/toolkit';
import popupSlice from './popupSlice';

const store = configureStore({
    reducer: {
        popup: popupSlice
    },
})

export default store;