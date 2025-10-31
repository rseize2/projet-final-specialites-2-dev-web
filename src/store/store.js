import { configureStore } from '@reduxjs/toolkit';
import markdownReducer from './slices/markdownSlice';
import imageSlice from './slices/imageSlice';

const store = configureStore({
    reducer: {
        markdown: markdownReducer,
        images: imageSlice,
    },
});

export default store;