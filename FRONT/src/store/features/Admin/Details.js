import {createSlice} from '@reduxjs/toolkit'

const initialState = {
     content:{}
    ,open:false
}

export default createSlice({
  name: 'details',
  initialState,
  reducers: {
    setContent : (state,action) => {
        state.content = action.payload;
    },
    setOpen : (state,action) => {
        state.open = true;
    },
    setClose : (state,action) => {
        state.open = false;
    }
  },
})
