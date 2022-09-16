import React from 'react';
import { Box } from '@mui/material';
// import { Link } from 'react-router-dom'

import { createSlice, createAction } from '@reduxjs/toolkit'

// import { Spinner } from '../../components/Spinner'
// import { PostAuthor } from './PostAuthor'
// import { TimeAgo } from './TimeAgo'
// import { ReactionButtons } from './ReactionButtons'

import { useGetUsersQuery } from '../../../api/apiSlice.js';
import {apiSlice} from '../../../api/apiSlice.js';

const initialState = {
     users:[]
    ,status:null
}

export default createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload // mutate the state all you want with immer
    },
    setStatus: (state, action) => {
        console.log(state,action);
      state.status = action.payload // mutate the state all you want with immer
    },
    handleFetch: (state, action) => {
        console.log('handleFetch',action.payload.status,action.payload.data);
        state.status = action.payload.status;
        state.users = (action.payload.data) ? action.payload.data : state.users;
    }
  },
  // "map object API"
//   extraReducers: {
//     [counter.actions.increment]: (
//       state,
//       action /* action will be inferred as "any", as the map notation does not contain type information */
//     ) => {
//       state.age += 1
//     },
//   },
})
