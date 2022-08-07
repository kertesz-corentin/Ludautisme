import { configureStore, applyMiddleware, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducer from './reducers';
import api from '../requests/index'

const store = configureStore({
    reducer ,
});

export default store;
