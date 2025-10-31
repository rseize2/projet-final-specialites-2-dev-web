import { configureStore } from '@reduxjs/toolkit';
import markdownReducer from './slices/markdownSlice';

const store = configureStore({
    reducer: {
        markdown: markdownReducer,
    },
});

export default store;