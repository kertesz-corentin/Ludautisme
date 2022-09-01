/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice,useQuery } from '@reduxjs/toolkit';
//import * as actions from '../actions';
import { apiSlice } from '../../store/api/apiSlice.js';


const initialState = [];

//Au premier chargement de la page remplir l'état initial
const fetchUsers2 = apiSlice;


const adminUsersSlice = createSlice({
  name: 'adminUsers',
  initialState,
  reducers: {
    fetchUsers : () =>{
        
    }
    //getAll
    //getOne
    //addOne
    //updateOne
    //deleteOne
  },
})


export const {fetchUsers} = adminUsersSlice.actions

export const selectAllUsers = state => state.users

export default adminUsersSlice.reducer;
