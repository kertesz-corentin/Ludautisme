import { configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducer from './reducers';
import api from '../requests/index'
import { apiSlice } from './api/apiSlice'

const store = configureStore({
        reducer : {
            ...reducer,
            [apiSlice.reducerPath]: apiSlice.reducer
        }
        , middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: false
            }).concat(apiSlice.middleware)
    });

export default store;
