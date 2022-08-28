/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as actions from '../actions';
// import { useGetUsersQuery } from '../../store/api/apiSlice.js';


const initialState = {
  users: [],
  status: 'idle',
  error: null
}



const adminUsersSlice = createSlice({
  name: 'adminUsers',
  initialState,
  reducers: {
    //getAll
    //getOne
    //addOne
    //updateOne
    //deleteOne
    fetch: ()=>{

    }
  },
})


export const {userAdded} = adminUsersSlice.actions

export const selectAllUsers = state => state.users

export default adminUsersSlice.reducer;
