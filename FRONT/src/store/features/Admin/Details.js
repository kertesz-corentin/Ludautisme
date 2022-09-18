import {createSlice} from '@reduxjs/toolkit'

const initialState = {
     content:{}
    ,open:false
}

export default createSlice({
  name: 'details',
  initialState,
  reducers: {
    setDetails: (state, action) => {
      state.content = action.payload; // mutate the state all you want with immer
    },
    openDetails: (state) => {
        state.open = true;
    },
    resetDetails: (state) => {
      state = {content:{},open:false}
    },
  },
})
