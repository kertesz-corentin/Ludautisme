import { configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducer from './reducers';
import api from '../requests/index'
import { apiSlice } from './features/api/apiSlice'

const store = configureStore({
        reducer : {
            ...reducer,
            [apiSlice.reducerPath]: apiSlice.reducer
        }
        , middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(apiSlice.middleware)
    });

export default store;
