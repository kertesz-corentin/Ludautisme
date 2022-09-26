import {createSlice} from '@reduxjs/toolkit'

const initialState = {
     content:{}
    ,open:false
    ,submitAction : null
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
    },
    setSubmitPayload:(state,action)  => {
      state.submitAction = action.payload // mutate the state all you want with immer
    },
  },
})
