/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as actions from '../actions';
import api from '../../requests'

const initialState = {
  users: [],
  status: 'idle',
  error: null
}

export const fetchUsers = createAsyncThunk('posts/fetchUsers', async () => {
  const response = await api.adminUsers.getAll();
  return response.data
})

const adminUsersSlice = createSlice({
  name: 'adminUsers',
  initialState,
  reducers: {
    fetch: ()=>{

    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.posts = state.posts.concat(action.payload)
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})


export const {userAdded} = adminUsersSlice.actions

export const selectAllUsers = state => state.users

export default adminUsersSlice.reducer;
